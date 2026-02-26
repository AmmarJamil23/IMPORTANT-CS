from signals.services import calculate_signal


def test_calculate_signal_buy():
    result = calculate_signal(110, 100)
    assert result == "BUY"

def test_calculate_signal_sell():
    result = calculate_signal(90, 100)
    assert result == "SELL"

def test_calculate_signal_hold():
    result = calculate_signal(100, 100)
    assert result == "HOLD"