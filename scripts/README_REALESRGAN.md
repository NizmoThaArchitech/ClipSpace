Real-ESRGAN runner

This project contains a helper `scripts/run_realesrgan.py` which:
- Uses the `.venv_realesrgan311` virtualenv (if present) or falls back to system python.
- Installs `realesrgan` into the venv if missing.
- Attempts to run the upscale with CUDA first and falls back to CPU automatically.

Quick usage from project root:

Windows PowerShell:

```powershell
py -3.11 -m venv .venv_realesrgan311   # only if you haven't created the venv
.\.venv_realesrgan311\Scripts\python -m pip install --upgrade pip
.\.venv_realesrgan311\Scripts\python -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
python .\scripts\run_realesrgan.py --input public/images/flow-overlay.jpg --output public/images/flow-overlay-4k.jpg --scale 4
```

Notes:
- If your GPU overheats, stop the process (Ctrl+C) and re-run with `--device cpu` or let the runner fallback automatically.
- The script will attempt to install `realesrgan` if it is not already installed in the venv (this may require internet and several minutes).
- You can edit the script to adjust model names or add additional CLI arguments to `realesrgan`.
