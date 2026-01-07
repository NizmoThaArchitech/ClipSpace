Project uploads folder

Important: The dev upload middleware and helper scripts were removed per project request.

If you need to make media available at `/uploads/<filename>`, copy files manually into this folder before running the dev server or include them in your deployment artifacts.

Recommended filename for the login background (if used)
- `bg-FbW.mp4`

Notes
- The dev server serves the `public` folder at `/` so any files placed in `public/uploads` will be available at `/uploads/<name>`.
