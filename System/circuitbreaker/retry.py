import time

def backend():
    time.sleep(2)
    return False

def client():
    for attempt in range(3):
        start = time.time()
        result = backend()

        if result:
            print("Success")
            return

        print("Failed, retrying...")
        time.sleep(0.5)

client()