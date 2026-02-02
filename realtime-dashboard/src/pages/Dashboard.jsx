import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/cards/MetricCard";
import MetricChart from "../components/charts/MetricChart";
import ErrorBoundary from "../components/layout/ErrorBoundary";
import { useMetricsStream } from "../hooks/useMetricsStream";

function Dashboard() {
  const { metrics, history, error } = useMetricsStream();

  return (
    <DashboardLayout>
      {error && <p className="text-red-400">{error}</p>}

      {metrics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ErrorBoundary>
              <MetricCard title="Active Users" value={metrics.users} />
            </ErrorBoundary>

            <ErrorBoundary>
              <MetricCard title="CPU Usage" value={`${metrics.cpu}%`} />
            </ErrorBoundary>

            <ErrorBoundary>
              <MetricCard title="Memory Usage" value={`${metrics.memory} GB`} />
            </ErrorBoundary>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ErrorBoundary>
              <MetricChart
                title="Users Over Time"
                data={history}
                dataKey="users"
                color="#22c55e"
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <MetricChart
                title="CPU Over Time"
                data={history}
                dataKey="cpu"
                color="#3b82f6"
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <MetricChart
                title="Memory Over Time"
                data={history}
                dataKey="memory"
                color="#f97316"
              />
            </ErrorBoundary>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
