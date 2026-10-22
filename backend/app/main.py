
from fastapi import FastAPI

app = FastAPI(
    title="AI-Enhanced DevConnect API",
    description="AI-powered developer intelligence and discovery.",
    version="0.1.0",
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
