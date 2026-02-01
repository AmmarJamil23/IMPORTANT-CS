import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/cards/MetricCard";
import { useMetricsStream } from "../hooks/useMetricsStream";
import MetricChart from "../components/charts/MetricChart";

function Dashboard() {

  const { metrics, history, status, error } = useMetricsStream();


    return (
      <DashboardLayout>
        {status === "loading" && (
          <p className="text-gray-400">Loading metrics...</p>
        )}

        {status === "error" && (
          <p className="text-red-400">{error}</p>
        )}

        {status === "success" && metrics && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Active Users" value={metrics.users} />
            <MetricCard title="CPU Usage" value={`${metrics.cpu}%`} />
            <MetricCard title="Memory Usage" value={`${metrics.memory} GB`} />

            <div className="grid grid-cols-1 md:grid-cols3 gap-4">

              <MetricChart
              title="Users Over Time"
              data={history}
              dataKey="users"
              color="#22c55e"
              />

              <MetricChart
              title="CPU Over Time"
              data={history}
              dataKey="cpu"
              color="#3b82f6"
               />

               <MetricChart
               title="Memory Over Time"
               data={history}
               dataKey="memory"
               color="#f97316"
                />

            </div>
            
        </div>
        )}

      </DashboardLayout>
    )
}

export default Dashboard;