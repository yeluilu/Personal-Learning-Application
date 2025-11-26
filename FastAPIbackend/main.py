from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from routers.users import SECRET_KEY, ALGORITHM
from database import create_db_and_tables, User, SessionDep
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlmodel import select
from jwt.exceptions import InvalidTokenError
from pydantic import BaseModel
import jwt



oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "login")

class TokenData(BaseModel):
    username: str | None = None

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: SessionDep):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = session.exec(select(User).where(User.username == token_data.username)).first()
    if user is None:
        raise credentials_exception
    return user

# Creating app 
app = FastAPI()


@app.get("/")
def start_page():
    return{"hello"}


# Authorization required 
@app.get("/users/me", response_model = User)
async def read_user(current_user: Annotated[User,Depends(get_current_user)]):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return current_user




# create 
@app.on_event("startup") 
def on_startup(): 
    create_db_and_tables()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, tags=["users"])