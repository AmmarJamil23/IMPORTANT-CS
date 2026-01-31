import { useEffect, useState } from "react";

export function useMetricsStream() {
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("loading");

    const interval = setInterval(() => {
      try {
        const nextMetrics = {
          users: 1200 + Math.floor(Math.random() * 100),
          cpu: Math.max(0, Math.min(100, 50 + (Math.random() * 20 - 10)).toFixed(2)),
          memory: Number((3 + (Math.random() * 0.5 - 0.25)).toFixed(2))
        };

        setMetrics(nextMetrics);
        setStatus("success");
      } catch (err) {
        setError("Failed to update metrics");
        setStatus("error");
        console.log(err)
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, status, error };
}
