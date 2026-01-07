import requests
r = requests.get('https://api.github.com/repos/xinntao/Real-ESRGAN/releases', timeout=15)
if r.ok:
    for rel in r.json()[:8]:
        print(rel.get('tag_name'))
        for a in rel.get('assets', []):
            print('  ', a.get('name'), a.get('browser_download_url'))
else:
    print('API_FAIL', r.status_code)
