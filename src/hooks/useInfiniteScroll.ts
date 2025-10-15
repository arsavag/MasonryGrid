import { useEffect } from "react";

export function useInfiniteScroll(
  ref: React.RefObject<Element>,
  onHit: () => void,
  rootMargin = "800px"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && onHit(),
      { root: null, rootMargin, threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, onHit, rootMargin]);
}
