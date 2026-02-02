import ConnectionStatus from "./ConnectionStatus"

function DashboardLayout({ children }) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold mb-6">
                Real Time Dashboard
            </h1>
            <ConnectionStatus />
            </div>
            {children}
        </div>
    )
}

export default DashboardLayout;