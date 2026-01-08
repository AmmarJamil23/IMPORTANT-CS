from aiohttp import web

async def handle(request):
    return web.Response(text="Response from Server 1")

async def health(request):
    return web.Response(text="OK")

app = web.Application()
app.router.add_get("/", handle)
app.router.add_get("/health", health)

web.run_app(app, port=9001)