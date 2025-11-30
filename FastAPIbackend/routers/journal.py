from fastapi import APIRouter, HTTPException, Depends
from database import JournalEntry, SessionDep
from sqlmodel import select
from typing import Annotated, List
from pydantic import BaseModel
from dependencies import get_current_user
from database import User

router = APIRouter()

class JournalEntryCreate(BaseModel):
    title: str
    mood: str
    content: str
    date: str

class JournalEntryResponse(BaseModel):
    id: int
    title: str
    mood: str
    content: str
    date: str

@router.post("/users/me/journal", response_model=JournalEntryResponse)
async def create_journal_entry(
    entry: JournalEntryCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """Create a new journal entry for the current user"""
    db_entry = JournalEntry(
        title=entry.title,
        mood=entry.mood,
        content=entry.content,
        date=entry.date,
        username=current_user.username
    )
    session.add(db_entry)
    session.commit()
    session.refresh(db_entry)
    return db_entry

@router.get("/users/me/journal", response_model=List[JournalEntryResponse])
async def get_journal_entries(
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """Get all journal entries for the current user"""
    statement = select(JournalEntry).where(JournalEntry.username == current_user.username).order_by(JournalEntry.created_at.desc())
    entries = session.exec(statement).all()
    return entries

@router.delete("/users/me/journal/{entry_id}")
async def delete_journal_entry(
    entry_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    """Delete a journal entry"""
    statement = select(JournalEntry).where(
        JournalEntry.id == entry_id,
        JournalEntry.username == current_user.username
    )
    entry = session.exec(statement).first()
    
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    session.delete(entry)
    session.commit()
    return {"message": "Entry deleted successfully"}
