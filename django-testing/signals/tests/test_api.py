import pytest
from rest_framework.test import APIClient
from signals.models import Signal


@pytest.mark.django_db
def test_create_signal_api_success():

    client = APIClient()

    response = client.post(
        "/api/signals/",
        {
            "symbol": "AAPL",
            "price": 200,
            "moving_average": 100
        },
        format="json"
    )

    assert response.status_code == 201
    assert response.data["signal"] == "BUY"

    assert Signal.objects.count() == 1