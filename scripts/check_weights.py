#!/usr/bin/env python3
"""Simple check to validate a model URL responds (HEAD) with 200 OK."""
import argparse
import requests

DEFAULT = 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.3.0/RealESRGAN_x4plus.pth'

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--model', '-m', default=DEFAULT)
    args = p.parse_args()

    try:
        r = requests.head(args.model, allow_redirects=True, timeout=15)
        if r.status_code == 200:
            print(f'Model URL OK: {args.model}')
            raise SystemExit(0)
        else:
            print(f'Unexpected status {r.status_code} for {args.model}')
            raise SystemExit(2)
    except Exception as e:
        print('Error checking model URL:', e)
        raise SystemExit(3)
