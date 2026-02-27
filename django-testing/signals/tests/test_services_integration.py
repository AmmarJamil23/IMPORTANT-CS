import pytest
from signals.services import generate_signal


@pytest.mark.django_db
def test_generate_signal_creates_database_record():
    signal_obj = generate_signal(
        symbol="AAPL",
        price=200,
        moving_average=100
    )

    assert signal_obj.id is not None
    assert signal_obj.symbol == "AAPL"
    assert signal_obj.signal == "BUY"