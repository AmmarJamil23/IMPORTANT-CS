from load_balancer import get_next_server

for request_id in range(1, 12):
    server = get_next_server()
    print(f"Request {request_id} sent to {server}")