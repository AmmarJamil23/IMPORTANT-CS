import os
from aiohttp import web, ClientSession

REGISTRY_URL = os.environ.get("REGISTRY_URL", "http://localhost:7000")

async def handle(request):
    async with ClientSession() as session:
        async with session.get(
            f"{REGISTRY_URL}/discover",
            params={"name": "service-a"}
        ) as resp:
            if resp.status != 200:
                return web.Response(text="Service A not available")

            data = await resp.json()
            service_url = data["url"]

        async with session.get(service_url) as service_resp:
            text = await service_resp.text()
            return web.Response(text=f"Service B got: {text}")

app = web.Application()
app.router.add_get("/", handle)

web.run_app(app, port=8002)
