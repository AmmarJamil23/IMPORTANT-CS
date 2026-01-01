from queue import Queue
from threading import Thread
import time

queue = Queue()

def producer():
    for i in range(5):
        message = f'order-{i}'
        queue.put(message)
        print("Produced:", message)
        time.sleep(1)

def consumer():
    while True:
        message = queue.get()
        print("Consumed:", message)
        time.sleep(2)
        queue.task_done()

Thread(target=consumer, daemon=True).start()
producer()
queue.join()