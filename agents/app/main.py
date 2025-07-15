# app/main.py
from app.routes.chat import chat_route
from fastapi import FastAPI

app = FastAPI()

app.include_router(chat_route, prefix="/chat", tags=["chat"])

@app.get("/")
def root():
    return {"message": "Agents API is running"}
