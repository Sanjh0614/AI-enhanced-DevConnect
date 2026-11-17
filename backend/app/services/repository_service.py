
from sqlalchemy import text
from sqlalchemy.orm import Session


def save_repositories(
    db: Session,
    profile_id: str,
    repositories: list[dict],
) -> int:
    saved_count = 0

    try:
        for repo in repositories:
            db.execute(
                text("""
                    INSERT INTO public.repositories (
                        profile_id,
                        github_repo_id,
                        name,
                        description,
                        html_url,
                        primary_language,
                        stars,
                        updated_at
                    )
                    VALUES (
                        CAST(:profile_id AS uuid),
                        :github_repo_id,
                        :name,
                        :description,
                        :html_url,
                        :primary_language,
                        :stars,
                        CAST(:updated_at AS timestamptz)
                    )
                    ON CONFLICT (github_repo_id)
                    DO UPDATE SET
                        name = EXCLUDED.name,
                        description = EXCLUDED.description,
                        html_url = EXCLUDED.html_url,
                        primary_language = EXCLUDED.primary_language,
                        stars = EXCLUDED.stars,
                        updated_at = EXCLUDED.updated_at
                    WHERE repositories.profile_id = EXCLUDED.profile_id
                """),
                {
                    "profile_id": profile_id,
                    "github_repo_id": repo["github_repo_id"],
                    "name": repo["name"],
                    "description": repo["description"],
                    "html_url": repo["html_url"],
                    "primary_language": repo["primary_language"],
                    "stars": repo["stars"],
                    "updated_at": repo["updated_at"],
                },
            )
            saved_count += 1

        db.commit()
        return saved_count

    except Exception:
        db.rollback()
        raise


def update_repository_readme(
    db: Session,
    profile_id: str,
    github_repo_id: int,
    readme_content: str | None,
) -> None:
    try:
        db.execute(
            text("""
                UPDATE public.repositories
                SET readme_content = :readme_content
                WHERE github_repo_id = :github_repo_id
                AND profile_id = CAST(:profile_id AS uuid)
            """),
            {
                "readme_content": readme_content,
                "github_repo_id": github_repo_id,
                "profile_id": profile_id,
            },
        )
        db.commit()

    except Exception:
        db.rollback()
        raise
