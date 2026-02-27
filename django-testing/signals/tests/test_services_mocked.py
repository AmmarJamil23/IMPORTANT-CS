from unittest.mock import patch
from signals.services import generate_signal


@patch("signals.services.repo_create_signal")
def test_generate_signal_calls_repository(mock_repo):

    mock_repo.return_value = "FAKE_OBJECT"

    result = generate_signal(
        symbol="AAPL",
        price=200,
        moving_average=100
    )

    mock_repo.assert_called_once()

    assert result == "FAKE_OBJECT"