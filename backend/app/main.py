from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.routes.ai import router as ai_router

app = FastAPI(
    title="EduGenie AI API",
    version="1.0"
)

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/api/user", tags=["User"])
app.include_router(ai_router, prefix="/api/ai", tags=["AI"])

@app.get("/")
def home():
    return {"message": "EduGenie Backend Running 🚀"}