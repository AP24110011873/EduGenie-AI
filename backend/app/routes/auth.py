from fastapi import APIRouter, HTTPException
from app.models.user import RegisterUser, LoginUser
from app.database.db import users
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token

router = APIRouter()

@router.post("/register")
def register(user: RegisterUser):

    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    })

    return {"message": "Registration Successful"}

@router.post("/login")
def login(user: LoginUser):

    db_user = users.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    token = create_access_token({
        "email": db_user["email"]
    })

    return {
        "token": token,
        "user": {
            "id": str(db_user["_id"]),
            "name": db_user["name"],
            "email": db_user["email"]
        }
    }