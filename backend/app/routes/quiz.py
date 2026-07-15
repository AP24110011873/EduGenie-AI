from datetime import datetime

from fastapi import APIRouter, Depends

from app.models.quiz import QuizRequest
from app.database.db import quizzes
from app.middleware.auth import get_current_user
from app.services.gemini_service import generate_quiz

router = APIRouter()


@router.post("/generate")
def create_quiz(
    request: QuizRequest,
    current_user=Depends(get_current_user)
):

    quiz = generate_quiz(
        request.topic,
        request.difficulty,
        request.questions
    )

    quizzes.insert_one({
        "email": current_user["email"],
        "topic": request.topic,
        "difficulty": request.difficulty,
        "questions": quiz,
        "created_at": datetime.utcnow()
    })

    return {
        "topic": request.topic,
        "difficulty": request.difficulty,
        "quiz": quiz
    }