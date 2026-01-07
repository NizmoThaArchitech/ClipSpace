import torch
import os
import itertools
pth = os.path.normpath('./.venv_realesrgan311/Lib/site-packages/weights/realesr-general-x4v3.pth')
print('path:', pth)
ckpt = torch.load(pth, map_location='cpu')
print('keys:', list(ckpt.keys()))
key = 'params_ema' if 'params_ema' in ckpt else ('params' if 'params' in ckpt else None)
print('chosen key:', key)
params = ckpt[key]
print('num entries:', len(params))
print('sample keys:')
for k, v in itertools.islice(params.items(), 40):
    print(k, v.shape)
# compute body index statistics
body_indices = []
for k in params.keys():
    if k.startswith('body.') and k.endswith('.weight'):
        parts = k.split('.')
        try:
            idx = int(parts[1])
            body_indices.append(idx)
        except:
            pass
print('num body weight keys:', len(body_indices))
if body_indices:
    print('min body idx', min(body_indices), 'max body idx', max(body_indices))
    print('unique body idx count', len(set(body_indices)))
