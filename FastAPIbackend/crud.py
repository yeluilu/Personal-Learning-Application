from typing import Dict
from sqlmodel import Session, select
from database import User

def authenticate_user_db(username: str, password: str, session: Session):
    # Query the user by email
    stored_user = session.exec(select(User).where(User.username == username)).first()
    if not stored_user:
        return None, "User not found"
    
    # Check password
    if stored_user.password != password:
        return None, "Incorrect password"
    
    return stored_user, None
