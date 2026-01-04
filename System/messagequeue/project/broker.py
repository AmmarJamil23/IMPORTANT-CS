from queue import Queue

class MessageBroker:
    def __init__(self):
        self.order_queue = Queue()

    def publish(self, event):
        self.order_queue.put(event)

    def consume(self):
        return self.order_queue.get()

    def ack(self):
        self.order_queue.task_done()