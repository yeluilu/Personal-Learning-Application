from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from database import create_db_and_tables

# Creating app 
app = FastAPI(
    title="Personal Learning Application API",
    description="Mental wellness and AI therapy application backend",
    version="1.0.0"
)

@app.get("/")
def root():
    """Root endpoint - API health check"""
    return {"message": "Personal Learning Application API", "status": "running"}

# Create database tables on startup
@app.on_event("startup") 
def on_startup(): 
    create_db_and_tables()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, tags=["users"])