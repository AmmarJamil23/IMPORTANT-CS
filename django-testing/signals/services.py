def calculate_signal(price, moving_average):
    if price > moving_average:
        return "BUY"
    elif price < moving_average:
        return "SELL"
    return "HOLD"