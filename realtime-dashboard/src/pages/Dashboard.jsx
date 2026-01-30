import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/cards/MetricCard";

function Dashboard() {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Active Users" value="1200" />
            <MetricCard title="CPU Usage" value="65%" />
            <MetricCard title="Memory Usage" value="3.2GB" />
        </div>

      </DashboardLayout>
    )
}

export default Dashboard;