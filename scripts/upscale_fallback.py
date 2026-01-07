from PIL import Image
import sys

def main():
    if len(sys.argv) < 4:
        print('Usage: upscale_fallback.py <input> <output> <scale>')
        sys.exit(2)
    inp, outp, scale = sys.argv[1], sys.argv[2], int(sys.argv[3])
    img = Image.open(inp)
    w, h = img.size
    new_size = (w * scale, h * scale)
    up = img.resize(new_size, resample=Image.LANCZOS)
    up.save(outp, quality=95)
    print(f'Wrote {outp} ({new_size[0]}x{new_size[1]})')

if __name__ == '__main__':
    main()
