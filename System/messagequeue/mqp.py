from queue import Queue
import time
import threading

order_queue = Queue()


def place_order(order_id):
    event = {
        "type": "ORDER_CREATED",
        "order_id": order_id
    }

    order_queue.put(event)
    print("Order placed:", order_id)


def send_email(event):
    print("Sending email for order:", event["order_id"])
    time.sleep(2)


def email_consumer():
    while True:
        event = order_queue.get()
        send_email(event)
        order_queue.task_done()


if __name__ == __main__:
    for i in range(3):
        place_order(i)
        time.sleep(1)

threading.Thread(target=email_consumer, daemon=True).start()


