from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class User(SQLModel, table=True):
    username: str = Field(index=True, primary_key = True)
    email: str = Field(index=True, unique = True)
    firstName: str
    lastName: str
    password: str

class JournalEntry(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    mood: str
    content: str
    date: str
    username: str = Field(foreign_key="user.username")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    

# MySQL configuration
MYSQL_USER = os.getenv("sqlVariable")
MYSQL_PASSWORD = os.getenv("sqlPassword")
MYSQL_HOST = "127.0.0.1"
MYSQL_PORT = "3306"
MYSQL_DATABASE = "mydatabase"

# Check if credentials are loaded
if not MYSQL_USER or not MYSQL_PASSWORD:
    raise ValueError("MySQL credentials not found. Make sure sqlVariable and sqlPassword are set in environment variables.")

if MYSQL_USER == "local_user" and MYSQL_PASSWORD == "local_password":
    print("Running without DB connection on this laptop.")
    engine = None
else:
    mysql_url = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
    try:
        engine = create_engine(mysql_url, echo=True)
    except Exception as e:
        print(f"Failed to connect to MySQL: {e}")
        raise



def create_db_and_tables():
    if engine is None:
        print("No database engine found. Skipping table creation.")
        return
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

