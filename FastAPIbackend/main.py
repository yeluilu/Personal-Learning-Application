from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from database import create_db_and_tables, User, SessionDep
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from sqlmodel import select, Session


app = FastAPI()


@app.get("/")
def start_page():
    return{"hello"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "login")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: SessionDep):
    stored_user = session.exec(select(User).where(User.username == token)).first()
    return stored_user


@app.get("/users/me")
async def read_user(current_user: Annotated[User,Depends(get_current_user)]):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return current_user


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