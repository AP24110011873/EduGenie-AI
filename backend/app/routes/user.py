from fastapi import APIRouter, Depends
from app.middleware.auth import get_current_user
from app.database.db import users

router = APIRouter()


@router.get("/profile")
def profile(current_user=Depends(get_current_user)):

    user = users.find_one(
        {"email": current_user["email"]},
        {"password": 0}
    )

    user["_id"] = str(user["_id"])

    return user