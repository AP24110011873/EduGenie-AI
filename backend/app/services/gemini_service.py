import google.generativeai as genai
from app.config.settings import GEMINI_API_KEY
import json

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_response(prompt: str):
    """
    Sends the user's prompt to Gemini
    and returns only the generated text.
    """
    try:
        response = model.generate_content(prompt)

        if response.text:
            return response.text

        return "I couldn't generate a response."

    except Exception as e:
        return f"Error: {str(e)}"

def summarize_text(text: str):

    prompt = f"""
You are an AI Learning Assistant.

Summarize the following document.

Requirements:
- Explain in simple language.
- Use headings.
- Use bullet points.
- Include key concepts.
- Keep it concise.

Document:

{text}
"""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return str(e)

def generate_quiz(topic: str, difficulty: str, count: int):

    prompt = f"""
You are an expert teacher.

Generate {count} multiple-choice questions on "{topic}".

Difficulty: {difficulty}

Return ONLY valid JSON.

Format:

[
  {{
    "question":"...",
    "options":[
      "...",
      "...",
      "...",
      "..."
    ],
    "answer":"..."
  }}
]
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)