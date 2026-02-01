import { useEffect, useState } from "react";
import { createMetricsClient } from "../services/metricsService";

export function useMetricsStream() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = createMetricsClient();

    const disconnect = client.connect(
      (payload) => {
        setMetrics(payload);

        setHistory((prev) => {
          const updated = [...prev, payload];
          return updated.slice(-20);
        });

        setStatus("connected");
      },
      (errMsg) => {
        setError(errMsg);
        setStatus("error");
      },
      () => {
        setStatus("connecting");
      }
    );

    return () => {
      disconnect();
    };
  }, []);

  return { metrics, history, status, error };
}
