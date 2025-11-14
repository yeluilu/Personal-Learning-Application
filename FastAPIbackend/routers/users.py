from fastapi import APIRouter, HTTPException, Depends
from database import User, SessionDep, get_session
from sqlalchemy.exc import IntegrityError
from sqlmodel import select, Session
from crud import authenticate_user_db

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
async def login(user: User, session: SessionDep):
    user_data, error = authenticate_user_db(user.email, user.password, session)
    if error:
        raise HTTPException(status_code=401, detail=error)
    
    return {"message": "Successful Login", "user": user_data}



@router.delete("/wipe")
def wipe_all_users(session: Session = Depends(get_session)):
    session.query(User).delete(); session.commit()
    return {"message": "All users deleted."}
