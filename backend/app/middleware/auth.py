from fastapi import Header, HTTPException
from app.utils.jwt_handler import verify_token


def get_current_user(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization Header"
        )

    token = authorization.split(" ")[1]

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )

    return payload