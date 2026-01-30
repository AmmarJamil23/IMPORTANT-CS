function DashboardLayout({ children }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">
                Real Time Dashboard
            </h1>
            {children}
        </div>
    )
}

export default DashboardLayout;