from datetime import datetime

from fastapi import APIRouter, Depends

from app.models.ai import ChatRequest
from app.middleware.auth import get_current_user
from app.services.gemini_service import generate_response
from app.database.db import chat_history

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest,
         current_user=Depends(get_current_user)):

    reply = generate_response(request.message)

    chat_history.insert_one({
        "email": current_user["email"],
        "user_message": request.message,
        "assistant_message": reply,
        "timestamp": datetime.utcnow()
    })

    return {
        "response": reply
    }