from fastapi import APIRouter, HTTPException
from models import User, LoginUser
import crud

router = APIRouter()

@router.post("/signup")
async def signup(user: User):
    created_user = crud.create_user(user)
    if not created_user:
        raise HTTPException(status_code=409, detail="Email already in use")
    return {"message": "User created successfully!", "user": created_user}

@router.post("/login")
async def login(user: LoginUser):
    user_data, error = crud.authenticate_user(user)
    if error:
        raise HTTPException(status_code=401, detail=error)
    return {"message": "Successful Login", "user": user_data}