
export function connectToMetricsStream(onMessage, onError) {
    const interval = setInterval(() => {
        try {
            const payload = {
                time: new Date().toLocaleDateString(),
                users: 1200 + Math.floor(Math.random() * 100),
                cpu: Math.max(0, Math.min(100, 50 + (Math.random() * 20 -10)).toFixed(2)),
                memory: Number((3 + (Math.random() * 0.5 - 0.25)).toFixed(2))
            };

            onMessage(payload)

        } catch (err) {
            onError("Stream error")
            console.log(err)
        }
    }, 2000)

    return () => clearInterval(interval)
}