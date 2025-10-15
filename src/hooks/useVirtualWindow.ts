import { useEffect, useState } from "react";

export function useVirtualWindow(
  ref: React.RefObject<HTMLElement>,
  overscan = 600
) {
  const [range, setRange] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setRange({
        top: Math.max(0, -rect.top - overscan),
        bottom: Math.max(0, window.innerHeight - rect.top + overscan)
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const ro = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    if (ro && ref.current) ro.observe(ref.current);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (ro) ro.disconnect();
    };
  }, [ref, overscan]);

  return range;
}
