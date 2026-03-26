from fastapi import APIRouter

router = APIRouter()

@router.post("/events")
async def create_event():
    return {"status": "ok"}