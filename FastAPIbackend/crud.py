from typing import Dict
from models import User, LoginUser

# In-memory "database"
user_data_base: Dict[str, dict] = {}

def create_user(user: User):
    if user.email in user_data_base:
        return None  # signal that email exists
    user_data_base[user.email] = {
        "FirstName": user.firstName,
        "Lastname": user.lastName,
        "username": user.username,
        "password": user.password
    }
    return user_data_base[user.email]

def authenticate_user(user: LoginUser):
    stored_user = user_data_base.get(user.email)
    if not stored_user:
        return None, "User not found"
    if stored_user["password"] != user.password:
        return None, "Incorrect password"
    return stored_user, None