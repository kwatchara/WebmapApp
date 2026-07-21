# Webmap App — Backend

FastAPI backend skeleton.

## Setup

```bash
# from repo root, using the shared virtualenv
.venv\Scripts\activate          # Windows
pip install -r backend/requirements.txt
```

## Run

```bash
cd backend
uvicorn main:app --reload
```

- API root: http://127.0.0.1:8000/
- Health check: http://127.0.0.1:8000/health
- Interactive docs (Swagger): http://127.0.0.1:8000/docs
