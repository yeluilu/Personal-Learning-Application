import os
from dotenv import load_dotenv

load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "ee64d7b78c6e3c6ea2e6f374c7104b902fe741d75e875c77e5acbc21771a1a02")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
