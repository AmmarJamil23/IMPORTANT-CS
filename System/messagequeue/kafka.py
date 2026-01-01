messages = ["order1", "order2", "order3"]
offset = 0


def consumer():
    global offset
    while offset < len(messages):
        msg = messages[offset]
        print("Processing", msg)
        offset += 1

consumer()