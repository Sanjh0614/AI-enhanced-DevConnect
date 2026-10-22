
import os
from functools import lru_cache

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient
from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    supabase_url: str

    model_config = {
        "env_file": Path(__file__).resolve().parents[2] / ".env",
        "env_file_encoding": "utf-8",
    }


@lru_cache
def get_settings():
    return Settings()


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    settings = get_settings()
    token = credentials.credentials

    jwks_url = f"{settings.supabase_url.rstrip('/')}/auth/v1/.well-known/jwks.json"

    try:
        jwks_client = PyJWKClient(jwks_url)
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["ES256", "RS256"],
            options={"require": ["exp", "sub"]},
            audience="authenticated",
        )

        return {"user_id": payload["sub"]}

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired access token",
        )
