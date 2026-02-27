from signals.models import Signal

def create_signal(symbol, price, moving_average, signal):

    return Signal.objects.create(
        symbol=symbol,
        price=price,
        moving_average=moving_average,
        signal=signal
    )