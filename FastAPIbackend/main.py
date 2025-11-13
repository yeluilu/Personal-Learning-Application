from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# -------------------------
# Models
# -------------------------
class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    username: str
    password: str  # added password

# -------------------------
# FastAPI app
# -------------------------
app = FastAPI()

# Enable CORS so React can access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, set your frontend URL instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user storage
user_data_base = {}

# -------------------------
# Routes
# -------------------------
@app.post("/signup")
async def create_user(user: User):
    if user.email in user_data_base:
        return {"error": "Email already in use"}

    # Save user data (in memory)
    user_data_base[user.email] = {
        "FirstName": user.firstName,
        "Lastname": user.lastName,
        "username": user.username,
        "password": user.password  # note: storing plain password is NOT safe in production
    }

    return {"message": "User created successfully!", "user": user_data_base[user.email]}

# Optional: route to see all users (for testing)
@app.get("/users")
async def get_users():
    return user_data_base