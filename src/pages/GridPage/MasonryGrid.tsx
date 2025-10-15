import React, { useLayoutEffect, useMemo, useRef, useState, Fragment } from "react";
import { useScrollVisibility } from "../../hooks/useScrollVisibility";
import { useMasonryLayout } from "../../hooks/useMasonryLayout";

export interface MasonryGridItem {
  id: string | number;
  width: number;
  height: number;
  render: (style: React.CSSProperties) => React.ReactNode;
}

interface Props {
  items: MasonryGridItem[];
  gap?: number;
  targetColWidth?: number;
}

export default function MasonryGrid({
  items,
  gap = 12,
  targetColWidth = 260
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const { positions, contentHeight } = useMasonryLayout({
    items: items.map((i) => ({ id: i.id, width: i.width, height: i.height })),
    containerWidth: width,
    targetColWidth,
    gap
  });

  const range = useScrollVisibility(ref as React.RefObject<HTMLElement>, 800);

  const visible = useMemo(
    () => positions.filter((p) => p.y + p.h >= range.top && p.y <= range.bottom),
    [positions, range]
  );

  return (
    <div ref={ref} style={{ position: "relative", minHeight: contentHeight }}>
      {visible.map((p) => {
        const item = items[p.index];
        const style: React.CSSProperties = {
          position: "absolute",
          transform: `translate(${p.x}px, ${p.y}px)`,
          width: p.w,
          height: p.h
        };
        return (
          <Fragment key={item.id}>{item.render(style)}</Fragment>
        );
      })}
    </div>
  );
}
