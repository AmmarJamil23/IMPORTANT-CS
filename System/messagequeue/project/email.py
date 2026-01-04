import time
import threading
from broker import MessageBroker

broker = MessageBroker()


def consumer():
    while True:
        event = broker.consumet()
        print(name, "processing order", event["order_id"])
        time.sleep(2)
        broker.ack()
        print(name, "done", event["order_id"])

threading.Thread(target=consumer, args=("Email Service") , daemon=True).start()

threading.Thread(target=consumer, args="Inventory Service", daemon=True).start()

threading.Thread(target=consumer, args=("PaymentService") , daemon=True).start()

time.sleep(20)