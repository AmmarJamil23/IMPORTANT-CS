from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from signals.services import generate_signal


@api_view(["POST"])
def create_signal_view(request):

    symbol = request.data.get("symbol")
    price = request.data.get("price")
    moving_average = request.data.get("moving_average")

    if not symbol or price is None or moving_average is None:
        return Response(
            {"error": "Invalid input"},
            status=status.HTTP_400_BAD_REQUEST
        )

    signal_obj = generate_signal(
        symbol=symbol,
        price=float(price),
        moving_average=float(moving_average)
    )

    return Response(
        {
            "id": signal_obj.id,
            "symbol": signal_obj.symbol,
            "signal": signal_obj.signal
        },
        status=status.HTTP_201_CREATED
    )