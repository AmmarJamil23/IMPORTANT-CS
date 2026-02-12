import yfinance as yf

# Get data for a ticker
ticker = yf.Ticker("AAPL")
# Get historical market data
hist = ticker.history(period="1mo")
print(hist)
