from queue import Queue
import threading
import time

# ----------------------------
# Broker (simulates RabbitMQ/Kafka)
# ----------------------------
class MessageBroker:
    def __init__(self):
        self.queue = Queue()

    def publish(self, event):
        self.queue.put(event)

    def consume(self):
        return self.queue.get()

    def ack(self):
        self.queue.task_done()


# ----------------------------
# Initialize broker
# ----------------------------
broker = MessageBroker()


# ----------------------------
# Producer (Order Service)
# ----------------------------
def place_order(order_id):
    event = {
        "event_id": f"evt-{order_id}",
        "type": "ORDER_CREATED",
        "order_id": order_id
    }
    broker.publish(event)
    print("Order placed:", order_id)


# ----------------------------
# Consumers
# ----------------------------
def consumer(service_name):
    while True:
        event = broker.consume()
        print(service_name, "processing order", event["order_id"])

        # simulate work
        time.sleep(2)

        broker.ack()
        print(service_name, "done with order", event["order_id"])


# ----------------------------
# Start consumers (scaling)
# ----------------------------
threading.Thread(target=consumer, args=("EmailService",), daemon=True).start()
threading.Thread(target=consumer, args=("InventoryService",), daemon=True).start()
threading.Thread(target=consumer, args=("PaymentService",), daemon=True).start()


# ----------------------------
# Produce orders
# ----------------------------
for i in range(6):
    place_order(i)
    time.sleep(0.5)

# keep main thread alive
time.sleep(20)
