import Dashboard from "./pages/Dashboard"
import { ConnectionProvider } from "./context/ConnectionContext";

function App() {
  return (
    <ConnectionProvider>
      <div className="min-h-screen bg-black text-white ">
      <Dashboard />
    </div>
    </ConnectionProvider>
    
  )
}

export default App;