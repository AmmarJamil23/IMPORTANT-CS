import { useEffect, useRef } from "react";

export default function InfiniteScrollSentinel({
  onVisible,
  isLoading,
  hasMore
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasMore || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          onVisible();
        }
      },
      {
        rootMargin: "200px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onVisible, isLoading, hasMore]);

  return <div ref={ref} className="h-1" />;
}
