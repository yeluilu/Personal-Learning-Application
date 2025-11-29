from openai import OpenAI
import os
from pydantic import BaseModel



client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

conversations = {}

class Message(BaseModel):
    message : str
    sessionID : str

async def generate_response(userMessage: Message):
    session_key = userMessage.sessionID

    if session_key not in conversations:
        conversations[session_key] = [{"role": "system", "content":"You are a supportive and loving friend, similar to a therapist"}]

    user_message = userMessage.message
    conversations[session_key].append({"role": "user", "content": user_message})

    response = client.responses.create(
        model = "gpt-5.1",
        reasoning = {"effort": "low"},
        input = conversations[session_key],
        max_output_tokens= 200,
    )

    conversations[session_key].append({"role": "assistant", "content": response.output_text})

    return {"message" : response.output_text}




