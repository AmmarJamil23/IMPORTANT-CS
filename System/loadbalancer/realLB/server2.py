from aiohttp import web

async def handle(request):
    return web.Response(text="Response from server 2")


app = web.Application()
app.router.add_get("/", handle)

web.run_app(app, port=9002)