import DashboardLayout from "./components/layout/DashboardLayout";
import VirtualizedList from "./components/list/VirtualizedList";
import { useItems } from "./features/items/useItems";

function App() {
  const { items, loadMore } = useItems();


  return (
   <DashboardLayout>
    <h1 className="text-white text-2xl font-semibold">
      Infinite Scroll Dashboard
    </h1>

    <button
    onClick={loadMore}
    className="mt-4 px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700"
    >
      Load Data
    </button>

   <VirtualizedList items={items} />
   </DashboardLayout>
  )
}

export default App;