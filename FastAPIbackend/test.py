import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # loads .env file

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Example function to test key
def test_key():
    models = client.models.list()
    print(models)

if __name__ == "__main__":
    test_key()
    print("hello")