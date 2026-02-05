import { useCallback, useEffect, useState } from "react";
import { fetchItems } from "../../lib/api/client";

export function useItems() {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchItems({ cursor: nextCursor });

      setItems(prev => [...prev, ...result.items]);
      setNextCursor(result.nextCursor);
      setHasMore(Boolean(result.nextCursor));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, nextCursor]);

  useEffect(() => {
    loadMore();
  }, []);

  return {
    items,
    isLoading,
    error,
    hasMore,
    loadMore
  };
}
