from aiohttp import web

async def handle(request):
    return web.Response(text="Response from Server 1")

app = web.Application()
app.router.add_get("/", handle)

web.run_App(app, port=9001)