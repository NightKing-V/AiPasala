from fastapi import APIRouter
from pydantic import BaseModel

chat_route = APIRouter()

class chatRequest(BaseModel):
    chatid: str
    text: str


@chat_route.get("/mainchat")
def main_chat():
    return {"message": "Chat endpoint is active"}
