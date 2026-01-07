#!/usr/bin/env python3
"""
Safe Real-ESRGAN runner.
- Uses the project Python 3.11 virtualenv at `.venv_realesrgan311` if present.
- Ensures `realesrgan` is installed in the venv (installs via pip if missing).
- Attempts to run with `--device cuda` first (if CUDA available). On failure, retries with `--device cpu`.

Usage:
  python scripts/run_realesrgan.py --input <input_path> --output <output_path> [--scale 4]

Examples:
  python scripts/run_realesrgan.py --input public/images/flow-overlay.jpg --output public/images/flow-overlay-4k.jpg --scale 4

"""
import argparse
import os
import subprocess
import sys
import shutil

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
VENV_PY = os.path.join(ROOT, '.venv_realesrgan311', 'Scripts', 'python.exe')

def which_venv_python():
    if os.path.exists(VENV_PY):
        return VENV_PY
    # fallback to system python
    return sys.executable

def run(cmd, check=True):
    print('> ' + ' '.join(cmd))
    return subprocess.run(cmd, check=check)

def ensure_realesrgan(python_exe):
    # check if realesrgan module/cli available
    try:
        run([python_exe, '-c', 'import realesrgan; print(realesrgan.__version__)'], check=True)
        return
    except Exception:
        print('`realesrgan` not found in venv — installing via pip (this may take some time).')
        run([python_exe, '-m', 'pip', 'install', 'realesrgan'], check=True)

def cuda_available(python_exe):
    try:
        res = subprocess.run([python_exe, '-c', 'import torch; print(torch.cuda.is_available())'], capture_output=True, text=True, check=True)
        return res.stdout.strip().lower() == 'true'
    except Exception:
        return False

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--input', '-i', required=True)
    p.add_argument('--output', '-o', required=True)
    p.add_argument('--scale', '-s', default='4')
    args = p.parse_args()

    python_exe = which_venv_python()
    print('Using Python:', python_exe)

    ensure_realesrgan(python_exe)

    prefer_cuda = cuda_available(python_exe)
    print('CUDA available:', prefer_cuda)

    devices = ['cuda', 'cpu'] if prefer_cuda else ['cpu']

    for device in devices:
        try:
            cmd = [python_exe, '-m', 'realesrgan', '--input', args.input, '--output', args.output, '--scale', str(args.scale), '--device', device]
            run(cmd, check=True)
            print(f'Successfully ran Real-ESRGAN on device={device}')
            return
        except subprocess.CalledProcessError as e:
            print(f'Run failed on device={device}:', e)
            print('Trying next device if available...')
        except Exception as e:
            print('Error running Real-ESRGAN:', e)
            print('Trying next device if available...')

    print('All attempts failed. See output above for errors.')

if __name__ == '__main__':
    main()
