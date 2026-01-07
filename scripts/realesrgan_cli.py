#!/usr/bin/env python3
"""Simple Real-ESRGAN CLI wrapper for this workspace.

Usage:
  python scripts/realesrgan_cli.py --input in.jpg --output out.jpg --scale 4 [--model MODEL_URL_OR_PATH] [--tile TILE_SIZE] [--half]

By default it will try to download the RealESRGAN_x4plus model from GitHub releases if no model is provided.
"""
import argparse
import os
import cv2
from realesrgan.utils import RealESRGANer
from realesrgan.archs.srvgg_arch import SRVGGNetCompact

DEFAULT_MODEL_URL = 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.3.0/RealESRGAN_x4plus.pth'


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--input', '-i', required=True)
    p.add_argument('--output', '-o', required=True)
    p.add_argument('--scale', '-s', type=int, default=4)
    p.add_argument('--model', '-m', default=DEFAULT_MODEL_URL)
    p.add_argument('--tile', type=int, default=0)
    p.add_argument('--tile-pad', type=int, default=10)
    p.add_argument('--pre-pad', type=int, default=10)
    p.add_argument('--half', action='store_true')
    p.add_argument('--gpu-id', type=int, default=None)
    args = p.parse_args()

    # model_path comes from args; define early for inspection
    model_path = args.model

    # Try to detect the checkpoint architecture and choose a matching model implementation
    model = None
    model_path_local = None
    if model_path and os.path.exists(model_path):
        model_path_local = model_path
    # if the model is a URL we've downloaded it to the weights dir above
    if model_path_local is None and model_path and os.path.basename(model_path):
        # resolve to weights dir file if exists
        weights_dir = os.path.join(os.path.dirname(__file__), '..', '.venv_realesrgan311', 'Lib', 'site-packages', 'weights')
        candidate = os.path.join(weights_dir, os.path.basename(model_path))
        if os.path.exists(candidate):
            model_path_local = candidate

    # If we have a local checkpoint, inspect it to select the right architecture
    if model_path_local is not None:
        import torch
        ckpt = torch.load(model_path_local, map_location='cpu')
        keyname = 'params_ema' if 'params_ema' in ckpt else ('params' if 'params' in ckpt else None)
        params = ckpt[keyname] if keyname is not None else {}
        # RRDB-style checkpoints usually have a conv_first / conv_body structure
        if any(k.startswith('conv_first') for k in params.keys()):
            # import local rrdb implementation
            import sys
            sys.path.insert(0, os.path.dirname(__file__))
            from rrdb_arch import RRDBNet
            # infer nf (num features), in/out channels and nb (num blocks)
            conv_first_weight = params.get('conv_first.weight')
            conv_last_weight = params.get('conv_last.weight')
            nf = int(conv_first_weight.shape[0]) if conv_first_weight is not None else 64
            in_nc = int(conv_first_weight.shape[1]) if conv_first_weight is not None else 3
            out_nc = int(conv_last_weight.shape[0]) if conv_last_weight is not None else 3
            # detect number of RRDB blocks in 'body'
            body_idxs = set()
            for k in params.keys():
                if k.startswith('body.') and '.rdb1.' in k and k.endswith('.conv1.weight'):
                    try:
                        idx = int(k.split('.')[1])
                        body_idxs.add(idx)
                    except Exception:
                        pass
            nb = max(body_idxs) + 1 if body_idxs else 23
            print(f'Detected RRDBNet(in_nc={in_nc}, out_nc={out_nc}, nf={nf}, nb={nb})')
            model = RRDBNet(in_nc=in_nc, out_nc=out_nc, nf=nf, nb=nb, gc=32, upscale=args.scale)
        else:
            # fallback to SRVGG compact (original quick model)
            model = SRVGGNetCompact(num_in_ch=3, num_out_ch=3, num_feat=64, num_conv=16, upscale=args.scale, act_type='prelu')
    else:
        # default if we couldn't inspect checkpoint
        model = SRVGGNetCompact(num_in_ch=3, num_out_ch=3, num_feat=64, num_conv=16, upscale=args.scale, act_type='prelu')

    # Previous attempt caught shape mismatches; keep a fallback that tries to infer num_out_ch
    try:
        rr = RealESRGANer(scale=args.scale, model_path=model_path, model=model, tile=args.tile, tile_pad=args.tile_pad, pre_pad=args.pre_pad, half=args.half, gpu_id=args.gpu_id)
    except RuntimeError as e:
        # Try the SRVGG adaptation logic from earlier for complex cases
        import torch
        loadnet = torch.load(model_path_local or model_path, map_location='cpu')
        keyname = 'params_ema' if 'params_ema' in loadnet else ('params' if 'params' in loadnet else None)
        if keyname is None:
            raise
        params = loadnet[keyname]
        # if SRVGG-style checkpoint, try to adapt num_out_ch
        body_weights = [(k, v) for k, v in params.items() if k.startswith('body.') and k.endswith('.weight')]
        if body_weights and isinstance(model, SRVGGNetCompact):
            def idx(kv):
                parts = kv[0].split('.')
                try:
                    return int(parts[1])
                except Exception:
                    return -1
            body_weights.sort(key=idx)
            last_k, last_v = body_weights[-1]
            out_channels = last_v.shape[0]
            detected_num_out_ch = out_channels // (args.scale * args.scale)
            print(f"Checkpoint appears to use num_out_ch={detected_num_out_ch}; recreating SRVGG model with that value and retrying")
            model = SRVGGNetCompact(num_in_ch=3, num_out_ch=detected_num_out_ch, num_feat=64, num_conv=16, upscale=args.scale, act_type='prelu')
            rr = RealESRGANer(scale=args.scale, model_path=model_path, model=model, tile=args.tile, tile_pad=args.tile_pad, pre_pad=args.pre_pad, half=args.half, gpu_id=args.gpu_id)
        else:
            raise

    # If model is a URL, try to download it to a local weights folder using requests+certifi to avoid urllib SSL verification issues
    model_path = args.model
    if model_path.startswith('http'):
        import requests, certifi
        weights_dir = os.path.join(os.path.dirname(__file__), '..', '.venv_realesrgan311', 'Lib', 'site-packages', 'weights')
        os.makedirs(weights_dir, exist_ok=True)
        local_name = os.path.join(weights_dir, os.path.basename(model_path))
        if not os.path.exists(local_name):
            print(f'Downloading model to {local_name} (this may take some time)')
            with requests.get(model_path, stream=True, verify=certifi.where()) as r:
                r.raise_for_status()
                with open(local_name, 'wb') as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
        model_path = local_name

    # Try to instantiate RealESRGANer. If loading the checkpoint fails due to shape mismatches
    # (different num_out_ch used when the model was saved), attempt to detect the expected
    # num_out_ch from the checkpoint and re-create the model accordingly.
    try:
        rr = RealESRGANer(scale=args.scale, model_path=model_path, model=model, tile=args.tile, tile_pad=args.tile_pad, pre_pad=args.pre_pad, half=args.half, gpu_id=args.gpu_id)
    except RuntimeError as e:
        # Inspect checkpoint to see expected last conv out channels and derive num_out_ch
        import torch
        loadnet = torch.load(model_path, map_location='cpu')
        keyname = 'params_ema' if 'params_ema' in loadnet else ('params' if 'params' in loadnet else None)
        if keyname is None:
            raise
        params = loadnet[keyname]
        # Find body.*.weight keys and pick the last one
        body_weights = [(k, v) for k, v in params.items() if k.startswith('body.') and k.endswith('.weight')]
        if body_weights:
            # sort by index
            def idx(kv):
                # key format: body.<idx>.weight
                parts = kv[0].split('.')
                try:
                    return int(parts[1])
                except Exception:
                    return -1
            body_weights.sort(key=idx)
            last_k, last_v = body_weights[-1]
            out_channels = last_v.shape[0]
            detected_num_out_ch = out_channels // (args.scale * args.scale)
            print(f"Checkpoint appears to use num_out_ch={detected_num_out_ch}; recreating model with that value and retrying")
            model = SRVGGNetCompact(num_in_ch=3, num_out_ch=detected_num_out_ch, num_feat=64, num_conv=16, upscale=args.scale, act_type='prelu')
            rr = RealESRGANer(scale=args.scale, model_path=model_path, model=model, tile=args.tile, tile_pad=args.tile_pad, pre_pad=args.pre_pad, half=args.half, gpu_id=args.gpu_id)
        else:
            # re-raise original error if we couldn't detect
            raise

    img = cv2.imread(args.input, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise SystemExit(f'Failed to read input image: {args.input}')

    out, mode = rr.enhance(img, outscale=None, alpha_upsampler='realesrgan')
    # ensure output directory
    os.makedirs(os.path.dirname(args.output) or '.', exist_ok=True)
    # use cv2 to write
    cv2.imwrite(args.output, out)
    print(f'Wrote {args.output}')


if __name__ == '__main__':
    main()
