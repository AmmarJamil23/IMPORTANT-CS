import pytest
from signals.models import Signal


@pytest.mark.django_db
def test_create_signal():

    signal = Signal.objects.create(
        symbol="AAPL",
        price=150,
        moving_average=140,
        signal="BUY"
    )

    count = Signal.objects.count()

    assert count == 1

    assert signal.id is not None
    assert signal.symbol == "AAPL"
    assert signal.signal == "BUY"