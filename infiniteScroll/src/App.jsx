import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
   <DashboardLayout>
    <h1 className="text-white text-2xl font-semibold">
      Infinite Scroll Dashboard
    </h1>

    <p className="text-gray-400 mt-2">
      Preparing architecture for large scale data rendering.
    </p>
   </DashboardLayout>
  )
}

export default App;