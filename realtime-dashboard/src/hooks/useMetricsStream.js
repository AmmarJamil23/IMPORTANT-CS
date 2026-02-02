import { useEffect, useState } from "react";
import { createMetricsClient } from "../services/metricsService";
import { useConnection } from "../context/ConnectionContext";

export function useMetricsStream() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const { setConnectionStatus } = useConnection();

  useEffect(() => {
    const client = createMetricsClient();

    const disconnect = client.connect(
      (payload) => {
        setMetrics(payload);

        setHistory((prev) => {
          const updated = [...prev, payload];
          return updated.slice(-20);
        });

        setConnectionStatus("connected");
      },
      (errMsg) => {
        setError(errMsg);
        setConnectionStatus("error");
      },
      () => {
        setConnectionStatus("connecting");
      }
    );

    return () => {
      disconnect();
    };
  }, []);

  return { metrics, history, error };
}
