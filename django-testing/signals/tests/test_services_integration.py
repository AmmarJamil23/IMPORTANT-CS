import pytest
from signals.services import generate_signal


@pytest.mark.django_db
def test_generate_signal_creates_database_record():
    signal_obj = generate_signal(
        symbol="AAPL",
        
    )