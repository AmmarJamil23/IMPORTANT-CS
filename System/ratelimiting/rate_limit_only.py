import time
from aiohttp import web

RATE = 5
WINDOW = 10

clients = {}

def allow(ip):
    now = time.time()

    if ip not in clients:
        clients[ip] = {
            "count": 0,
            "start": now
        }

    if now - clients[ip]["start"] > WINDOW:
        clients[ip]["count"] = 0
        clients[ip]["start"] = now

    if clients[ip]["count"] >= RATE:
        return False

    clients[ip]["count"] += 1
    return True

async def handle(request):
    ip = request.remote

    if not allow(ip):
        return web.Response(status=429, text="Too many requests")

    return web.Response(text="Request allowed")

app = web.Application()
app.router.add_get("/", handle)

web.run_app(app, port=8000)