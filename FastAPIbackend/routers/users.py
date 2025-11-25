from fastapi import APIRouter, HTTPException, Depends
from database import User, SessionDep, get_session
from sqlalchemy.exc import IntegrityError
from sqlmodel import select, Session
from typing import Annotated
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone

################################### CREATING TOKENS ###############################################################
SECRET_KEY = "ee64d7b78c6e3c6ea2e6f374c7104b902fe741d75e875c77e5acbc21771a1a02"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str

def create_access_token(data: dict, expires_delta: timedelta | None = None):        
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

###################################################################################################################





##################################### Hashing password ############################################################
password_hash = PasswordHash.recommended()


def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password,hashed_password)

def get_password_hash(password):
    return password_hash.hash(password)

# Authenticate users
def authenticate_user_db(username: str, password: str, session: Session):
    # Query the user by email
    stored_user = session.exec(select(User).where(User.username == username)).first()
    if not stored_user:
        return None, "User not found"
    
    verified_password = verify_password(password, stored_user.password)

    # Check password
    if not verified_password:
        return None, "Incorrect password"
    
    return stored_user, None

###################################################################################################################





######################################## Routes ###################################################################
router = APIRouter()

@router.post("/signup")
async def signup(user: User, session: SessionDep) -> User:
    hashed_password = get_password_hash(user.password)
    user.password = hashed_password

    try:
        session.add(user)
        session.commit() 
        session.refresh(user)
        return user
    except IntegrityError:
        session.rollback()  # undo the failed transaction
        raise HTTPException(status_code=409, detail="Email already in use")
    

# Where user sends login info, we respond with token
@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep) -> Token:
    user_dict, error = authenticate_user_db(form_data.username, form_data.password, session)
    if error:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data = {"sub": user_dict.username}, expires_delta = access_token_expires)
    
    return Token(access_token=access_token, token_type = "bearer")



@router.delete("/wipe")
def wipe_all_users(session: Session = Depends(get_session)):
    session.query(User).delete(); session.commit()
    return {"message": "All users deleted."}

###################################################################################################################