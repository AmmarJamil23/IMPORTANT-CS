from sqlalchemy import Column, String, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class Event(Base):
    __tablename__ = "events"

    event_id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    event_type = Column(String, nullable=False)
    payload = Column(JSON, nullable=False)
    created_at = Column(DateTime, nullable=False)
    