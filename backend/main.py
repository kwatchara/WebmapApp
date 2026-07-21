"""Webmap App — FastAPI backend skeleton.

Serves the built frontend (backend/webroot, copied from frontend/dist on each
`vite build`) as the web root, and exposes the API under /api.

Run locally:
    uvicorn main:app --reload

Interactive docs:
    http://127.0.0.1:8000/docs
"""

from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Webmap App API",
    description="Backend API for the Webmap App.",
    version="0.1.0",
)

WEBROOT = Path(__file__).resolve().parent / "webroot"


@app.get("/api")
def api_root() -> dict[str, str]:
    return {"service": "Webmap App API", "status": "ok"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "healthy"}


# Serve the built frontend as the web root. Mounted last so the explicit API
# routes above (and /docs, /openapi.json) take precedence. `html=True` makes
# "/" resolve to index.html and serves the other .html pages directly.
if WEBROOT.is_dir():
    app.mount("/", StaticFiles(directory=WEBROOT, html=True), name="webroot")
