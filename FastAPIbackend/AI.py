from openai import OpenAI
import os
from pydantic import BaseModel



client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

class Message(BaseModel):
    message : str

async def generate_response(userMessage: Message):

    user_message = userMessage.message

    response = client.responses.create(
        model = "gpt-5-mini",
        reasoning = {"effort": "low"},
        input = [
            {
                "role": "system",
                "content": "You are a supportive and loving friend, simalar to a therapist"
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
        temperature = 0.7,
        max_output_tokens= 300,
    )

    return {"message" : response.output_text}

