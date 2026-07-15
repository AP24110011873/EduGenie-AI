import google.generativeai as genai
from app.config.settings import GEMINI_API_KEY

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