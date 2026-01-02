# balance = 1000

# def process_payment(amount):
#     global balance
#     balance -= amount
#     print("Balance:", balance)

#The problem with the above code is that if this runs twice, then the balance becomes wrong, this is non idempotent so duplicate message can cause damage.

processed_orders = set()
balance = 1000

def processed_payment(order_id, amount):
    global balance

    if order_id in processed_orders:
        print("Duplicate message ignored:", order_id)
        return

    balance -= amount
    processed_orders.add(order_id)
    print("Processed order:", order_id)
    print("Balance", balance)

