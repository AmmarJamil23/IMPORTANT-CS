export function createMetricsClient() {
  let intervalId = null;
  let retryCount = 0;
  const MAX_RETRIES = 5;

  function connect(onMessage, onError, onOpen) {
    if (retryCount >= MAX_RETRIES) {
      onError("Max reconnect attempts reached");
      return () => {};
    }

    onOpen();

    intervalId = setInterval(() => {
      try {
        const payload = {
          time: new Date().toLocaleTimeString(),
          users: 1200 + Math.floor(Math.random() * 100),
          cpu: Math.max(0, Math.min(100, 50 + (Math.random() * 20 - 10)).toFixed(2)),
          memory: Number((3 + (Math.random() * 0.5 - 0.25)).toFixed(2))
        };

        if (Math.random() < 0.1) {
          throw new Error("Simulated connection drop");
        }

        onMessage(payload);
      } catch (err) {
        clearInterval(intervalId);
        retryCount += 1;

        const backoff = Math.min(2000 * retryCount, 10000);

        setTimeout(() => {
          connect(onMessage, onError, onOpen);
        }, backoff);
        console.log(err)
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }

  return { connect };
}
