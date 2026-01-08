import time
from aiohttp import web, ClientSession

BACKEND_URL = "http://localhost:9001"

RATE = 5
PER_SECONDS = 10

clients = {}

def allow_request(client_ip):
    now = time.time()

    if client_ip not in clients:
        clients[client_ip] = {
            "tokens": RATE,
            "last": now
        }

    bucket = clients[client_ip]

    elapsed = now - bucket["last"]
    refill = elapsed * (RATE / PER_SECONDS)

    bucket["tokens"] = min(RATE, bucket["tokens"] + refill)
    bucket["last"] = now

    if bucket["tokens"] < 1:
        return False

    bucket["tokens"] -= 1
    return True

async def handle(request):
    client_ip = request.remote

    if not allow_request(client_ip):
        return web.Response(
            status=429,
            text="Too many requests"
        )

    async with ClientSession() as session:
        async with session.get(BACKEND_URL) as resp:
            body = await resp.text()
            return web.Response(
                text=body,
                status=resp.status
            )

app = web.Application()
app.router.add_get("/", handle)

web.run_app(app, port=8000)
