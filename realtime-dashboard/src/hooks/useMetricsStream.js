import { useEffect, useState } from "react";

export function useMetricsStream() {
    const [metrics, setMetrics] = useState({
        users: 1200,
        cpu: 65,
        memory: 3.2
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics((prev) => ({
                users: prev.users + Math.floor(Math.random() * 5),

                cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() * 10 - 5)).toFixed(3)),
                
                memory: Math.max(
                    0,
                    (prev.memory + (Math.random() * 0.2 - 0.1)).toFixed(2)
                )
            }))
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return { metrics };
}