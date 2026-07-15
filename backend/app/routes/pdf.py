from datetime import datetime

from fastapi import APIRouter, UploadFile, File, Depends

from app.middleware.auth import get_current_user
from app.services.pdf_service import extract_text
from app.services.gemini_service import summarize_text
from app.database.db import summaries

router = APIRouter()


@router.post("/summarize")
async def summarize_pdf(
        file: UploadFile = File(...),
        current_user=Depends(get_current_user)
):

    text = extract_text(file.file)

    summary = summarize_text(text)

    summaries.insert_one({
        "email": current_user["email"],
        "filename": file.filename,
        "summary": summary,
        "created_at": datetime.utcnow()
    })

    return {
        "filename": file.filename,
        "summary": summary
    }