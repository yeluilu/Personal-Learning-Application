from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from database import create_db_and_tables


app = FastAPI()
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
app.include_router(users.router, prefix="/users", tags=["users"])