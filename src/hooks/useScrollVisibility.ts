import { useEffect, useState } from "react";

export function useScrollVisibility(
  ref: React.RefObject<HTMLElement>,
  buffer = 600
) {
  const [range, setRange] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setRange({
        top: Math.max(0, -rect.top - buffer),
        bottom: Math.max(0, window.innerHeight - rect.top + buffer)
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    if (resizeObserver && ref.current) resizeObserver.observe(ref.current);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [ref, buffer]);

  return range;
}
