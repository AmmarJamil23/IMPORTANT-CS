from signals.repositories import create_signal as repo_create_signal


def calculate_signal(price, moving_average):

    if price > moving_average:
        return "BUY"
    
    elif price < moving_average:
        return "SELL"
    
    return "HOLD"


def generate_signal(symbol, price, moving_average):

    signal = calculate_signal(price, moving_average)

    signal_obj = repo_create_signal(
        symbol = symbol,
        price=price,
        moving_average=moving_average,
        signal=signal
    )

    return signal_obj