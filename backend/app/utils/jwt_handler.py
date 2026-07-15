from jose import jwt
from datetime import datetime, timedelta
import os

SECRET = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_token(data):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(days=7)
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)