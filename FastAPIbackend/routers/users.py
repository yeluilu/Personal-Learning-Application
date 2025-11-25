from fastapi import APIRouter, HTTPException, Depends
from database import User, SessionDep, get_session, authenticate_user_db
from sqlalchemy.exc import IntegrityError
from sqlmodel import select, Session
from typing import Annotated

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


router = APIRouter()

@router.post("/signup")
async def signup(user: User, session: SessionDep) -> User:
    try:
        session.add(user)
        session.commit() 
        session.refresh(user)
        return user
    except IntegrityError:
        session.rollback()  # undo the failed transaction
        raise HTTPException(status_code=409, detail="Email already in use")
    


@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep):
    user_dict, error = authenticate_user_db(form_data.username, form_data.password, session)
    if error:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user_dict.username, "token_type": "bearer"}




@router.delete("/wipe")
def wipe_all_users(session: Session = Depends(get_session)):
    session.query(User).delete(); session.commit()
    return {"message": "All users deleted."}
