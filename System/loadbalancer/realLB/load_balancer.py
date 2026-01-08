import asyncio
from aiohttp import web, ClientSession

backends = [
    "http://localhost:9001",
    "http://localhost:9002"
]

healthy_backends = backends.copy()
current = 0

async def health_check():
    global healthy_backends

    while True:
        new_healthy = []

        async with ClientSession() as session:
            for backend in backends:
                try:
                    async with session.get(f"{backend}/health", timeout=1) as resp:
                        if resp.status == 200:
                            new_healthy.append(backend)

                
                except:
                    pass
        
        healthy_backends = new_healthy
        await asyncio.sleep(2)


async def handle(request):
    global current

    if not healthy_backends:
        return web.Response(status=503, text="No healthy backends")

    backend = backends[current]
    current = (current + 1) % len(backends)

    async with ClientSession() as session:
        async with session.get(backend) as resp:
            body = await resp.text()
            return web.Response(text=body)
            
app = web.Application()
app.router.add_get("/", handle)

async def start_background_tasks(app):
    app["health_task"] = asyncio.create_task(health_check())

async def cleanup_background_tasks(app):
    app["health_task"].cancel()

app.on_startup.append(start_background_tasks)
app.on_cleanup.append(cleanup_background_tasks)

web.run_app(app, port=8000)