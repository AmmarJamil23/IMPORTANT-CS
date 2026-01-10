import os
import asyncio
from aiohttp import web, ClientSession

SERVICE_NAME = "service-a"
SERVICE_PORT = int(os.environ.get("SERVICE_PORT", 8001))
REGISTRY_URL = os.environ.get("REGISTRY_URL", "http://localhost:7000")

async def handle(request):
    return web.Response(text="Hello from Service A")

async def register():
    async with ClientSession() as session:
        await session.post(
            f"{REGISTRY_URL}/register",
            json={
                "name": SERVICE_NAME,
                "url": f"http://localhost:{SERVICE_PORT}"
            }
        )

app = web.Application()
app.router.add_get("/", handle)

async def start_app(app):
    await register()

app.on_startup.append(start_app)

web.run_app(app, port=SERVICE_PORT)
