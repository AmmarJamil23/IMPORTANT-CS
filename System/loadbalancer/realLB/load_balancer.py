from aiohttp import web, ClientSession

backends = [
    "http://localhost:9001",
    "http://localhost:9002"
]

current = 0

async def handle(request):
    global current

    backend = backends[current]
    current = (current + 1) % len(backends)

    async with ClientSession() as session:
        async with session.get(backend) as resp:
            body = await resp.text()
            return web.Response(text=body)
            
app = web.Application()
app.router.add_get("/", handle)

web.run_app(app, port=8000)