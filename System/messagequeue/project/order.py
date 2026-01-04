import time
from broker import MessageBroker

broker = MessageBroker()

def place_order(order_id):
    event = {
        "event_id": f"evt-{order_id}",
        "type": "ORDER_CREATED",
        "order_id": order_id
    }
    broker.publish(event)
    print("Order placed:", order_id)


for i in range(6):
    place_order(i)
    time.sleep(0.5)
