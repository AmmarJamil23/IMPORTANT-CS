from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class EventCreate(BaseModel):
    event_id: UUID
    event_type: str
    payload: dict
    created_at: datetime