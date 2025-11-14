from pydantic import BaseModel

class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    username: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str