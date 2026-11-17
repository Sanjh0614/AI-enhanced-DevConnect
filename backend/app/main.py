
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.services.github_service import fetch_user_repositories
from sqlalchemy import text
from app.core.auth import get_current_user
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from app.database import SessionLocal
from app.services.repository_service import save_repositories
from app.services.github_service import fetch_repository_readme
from app.services.repository_service import update_repository_readme

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

@app.get("/github/{username}/repositories")
async def get_github_repositories(username: str):
    repositories = await fetch_user_repositories(username)

    return {
        "username": username,
        "count": len(repositories),
        "repositories": repositories,
    }

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/github/sync")
async def sync_github_repositories(
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile_id = user["user_id"]

    result = db.execute(
        text("""
            SELECT github_username
            FROM public.profiles
            WHERE id = CAST(:profile_id AS uuid)
        """),
        {"profile_id": profile_id},
    ).mappings().first()

    if not result or not result["github_username"]:
        raise HTTPException(
            status_code=400,
            detail="Set your GitHub username in your profile first.",
        )

    repositories = await fetch_user_repositories(
        result["github_username"]
    )

    saved_count = save_repositories(
        db,
        profile_id,
        repositories,
    )

    readme_count = 0

    for repo in repositories:
        readme_content = await fetch_repository_readme(
            repo["full_name"]
        )

        if readme_content is not None:
            update_repository_readme(
                db,
                profile_id,
                repo["github_repo_id"],
                readme_content,
            )
            readme_count += 1

    return {
        "message": "Repositories and READMEs synced successfully",
        "repositories_synced": saved_count,
        "readmes_synced": readme_count,
    }
