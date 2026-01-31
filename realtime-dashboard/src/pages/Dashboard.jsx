import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/cards/MetricCard";
import { useMetricsStream } from "../hooks/useMetricsStream";

function Dashboard() {

  const { metrics } = useMetricsStream();




    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Active Users" value={metrics.users} />
            <MetricCard title="CPU Usage" value={`${metrics.cpu}%`} />
            <MetricCard title="Memory Usage" value={`${metrics.memory} GB`} />
            
        </div>

      </DashboardLayout>
    )
}

export default Dashboard;