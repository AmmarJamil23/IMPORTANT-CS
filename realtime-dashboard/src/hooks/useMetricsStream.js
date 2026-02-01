import { useEffect, useState } from "react";
import { connectToMetricsStream } from "../services/metricsService";

export function useMetricsStream() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("loading");

    const disconnect = connectToMetricsStream(
      (payload) => {
        setMetrics(payload);

        setHistory((prev) => {
          const updated = [...prev, payload];
          return updated.slice(-20);
        });

        setStatus("success");
      },
      (errMsg) => {
        setError(errMsg);
        setStatus("error");
      }
    );

    

    return () => disconnect();
  }, []);

  return { metrics, history,  status, error };
}
