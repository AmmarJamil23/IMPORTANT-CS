import DashboardLayout from "./components/layout/DashboardLayout";
import VirtualizedList from "./components/list/VirtualizedList";
import { useItems } from "./features/items/useItems";

function App() {
  const {
    items,
    loadMore,
    isLoading,
    hasMore,
    error
  } = useItems();

  return (
    <DashboardLayout>
      <h1 className="text-white text-2xl font-semibold">
        Infinite Scroll Dashboard
      </h1>

      {error && (
        <p className="text-red-400 mt-4">
          Failed to load data
        </p>
      )}

      <VirtualizedList
        items={items}
        onLoadMore={loadMore}
        isLoading={isLoading}
        hasMore={hasMore}
      />

      {isLoading && (
        <p className="text-gray-400 mt-4">
          Loading more items
        </p>
      )}
    </DashboardLayout>
  );
}

export default App;
