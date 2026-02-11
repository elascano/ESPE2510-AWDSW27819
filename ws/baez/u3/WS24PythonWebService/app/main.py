import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.routes import router
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="API MongoDB Simple")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes first
app.include_router(router)

# Static files for CSS, JS, etc.
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Root route returns JSON data from database
@app.get("/")
async def root():
    from app.db import customers
    from app.models import user_to_dict
    return [user_to_dict(c) for c in customers.find()]

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
