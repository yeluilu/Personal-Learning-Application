from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select


class User(SQLModel, table=True):
    username: str = Field(index=True, primary_key = True)
    email: str = Field(index=True, unique = True)
    firstName: str
    lastName: str
    password: str

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def authenticate_user_db(username: str, password: str, session: Session):
    # Query the user by email
    stored_user = session.exec(select(User).where(User.username == username)).first()
    if not stored_user:
        return None, "User not found"
    
    # Check password
    if stored_user.password != password:
        return None, "Incorrect password"
    
    return stored_user, None

