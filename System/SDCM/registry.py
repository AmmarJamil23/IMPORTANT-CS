from aiohttp import web

services = {}

async def register(request):
    data = await request.json()
    name = data["name"]
    url = data["url"]

    services[name] = url
    return web.json_response({"status": "registered"})

async def discover(request):
    name = request.query.get("name")
    url = services.get(name)

    if not url:
        return web.Response(status=404, text="Service not found")

    return web.json_response({"url": url})


app = web.Application()
app.router.add_post("/register", register)
app.router.add_get("/discover", discover)

web.run_app(app, port=7000)