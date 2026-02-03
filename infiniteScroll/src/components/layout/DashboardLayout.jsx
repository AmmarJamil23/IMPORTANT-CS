
function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto p-6">
                {children}
            </div>

        </div>
    )
}

export default DashboardLayout;