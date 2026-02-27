from django.db import models

# Create your models here.

class Signal(models.Model):

    SIGNAL_CHOICES = [
        ("BUY", "Buy"),
        ("SELL", "Sell"),
        ("HOLD", "Hold"),
    ]

    symbol = models.CharField(max_length=10)

    price = models.FloatField()

    moving_average = models.FloatField()

    signal = models.CharField(

        max_length=4,
        choices=SIGNAL_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.symbol} - {self.signal}"
