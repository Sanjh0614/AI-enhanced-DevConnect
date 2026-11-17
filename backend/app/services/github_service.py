
import base64
import httpx
from fastapi import HTTPException


GITHUB_API_BASE = "https://api.github.com"


async def fetch_user_repositories(username: str) -> list[dict]:
    username = username.strip()

    if not username:
        raise HTTPException(
            status_code=400,
            detail="GitHub username cannot be empty.",
        )

    url = f"{GITHUB_API_BASE}/users/{username}/repos"

    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    params = {
        "sort": "updated",
        "direction": "desc",
        "per_page": 100,
        "type": "owner",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(
                url,
                headers=headers,
                params=params,
            )

        if response.status_code == 404:
            raise HTTPException(
                status_code=404,
                detail="GitHub user not found.",
            )

        if response.status_code in (403, 429):
            raise HTTPException(
                status_code=503,
                detail="GitHub API rate limit reached. Try again later.",
            )

        response.raise_for_status()
        repositories = response.json()

        return [
            {
                "github_repo_id": repo["id"],
                "name": repo["name"],
                "full_name": repo["full_name"],
                "description": repo["description"],
                "html_url": repo["html_url"],
                "primary_language": repo["language"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "updated_at": repo["updated_at"],
            }
            for repo in repositories
        ]

    except HTTPException:
        raise
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="GitHub API request timed out.",
        )
    except httpx.HTTPStatusError:
        raise HTTPException(
            status_code=502,
            detail="GitHub API returned an unexpected error.",
        )
    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to GitHub API.",
        )


async def fetch_repository_readme(full_name: str) -> str | None:
    url = f"{GITHUB_API_BASE}/repos/{full_name}/readme"

    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(url, headers=headers)

        if response.status_code == 404:
            return None

        if response.status_code in (403, 429):
            raise HTTPException(
                status_code=503,
                detail="GitHub API rate limit reached.",
            )

        response.raise_for_status()

        data = response.json()
        encoded_content = data.get("content", "")

        return base64.b64decode(encoded_content).decode(
            "utf-8",
            errors="replace",
        )

    except HTTPException:
        raise
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="GitHub README request timed out.",
        )
    except httpx.HTTPStatusError:
        raise HTTPException(
            status_code=502,
            detail="Could not fetch repository README.",
        )
    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to GitHub API.",
        )
