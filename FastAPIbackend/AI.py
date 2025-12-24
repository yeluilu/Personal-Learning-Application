from openai import OpenAI
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(override=True)

api_key = os.getenv("OPENAI_API_KEY")




if api_key:
    api_key = api_key.strip()

if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable is missing. Please add it to your .env file.")

# Debug: verify the key looks correct (first/last 10 chars)
print(f"API Key starts with: {api_key[:10]}")
print(f"API Key ends with: {api_key[-10:]}")
print(f"API Key length: {len(api_key)}")

client = OpenAI(
    api_key= api_key
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




