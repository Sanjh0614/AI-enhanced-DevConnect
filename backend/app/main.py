
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.core.auth import get_current_user

app = FastAPI(
    title="AI-Enhanced DevConnect API",
    description="AI-powered developer intelligence and discovery.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/")
def root():
    return {
        "message": "DevConnect API is running",
        "status": "healthy",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/me")
def me(user: dict = Depends(get_current_user)):
    return user
