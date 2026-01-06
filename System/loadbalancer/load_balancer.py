from backend_server import servers

current_index = 0

def get_next_server() :
    global current_index

    server = servers[current_index]

    current_index = (current_index + 1) % len(servers)

    return server