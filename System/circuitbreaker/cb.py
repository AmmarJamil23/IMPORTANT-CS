import time

FAILURE_LIMIT = 3
RESET_TIME = 10

failures = 0
state = "closed"
opened_at = None


def call_backend():
    # pretend backend is failing
    return False

def request():
    global failures, state, opened_at

    if state == "open":
        if time.time() - opened_at > RESET_TIME:
            state = "half_open"
        else:
            print("Request blocked by circuit breaker")
            return
    
    success = call_backend()

    if success:
        failures = 0
        state = "closed"
        print("Request succeeded")
    else:
        failures += 1
        print("Request failed")

        if failures >= FAILURE_LIMIT:
            state = "open"
            opened_at = time.time()
            print("Circuit breaker opened")