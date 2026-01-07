import time
import sys

def try_import(name):
    t0 = time.time()
    try:
        __import__(name)
        print(f"OK {name} {time.time()-t0:.2f}s")
    except Exception as e:
        print(f"ERR {name} {time.time()-t0:.2f}s {e!r}")
        sys.exit(1)

modules = [
    'torch',
    'torch._C',
    'torch._decomp',
    'torch._prims',
    'torch._library',
]

for m in modules:
    print('importing', m)
    try_import(m)

print('diagnostic complete')
