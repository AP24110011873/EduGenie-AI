from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client[os.getenv("DATABASE_NAME")]

users = db.users
chat_history = db.chat_history
notes = db.notes
quizzes = db.quizzes