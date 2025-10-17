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
  targetColumnWidth?: number;
}

export default function MasonryGrid({
  items,
  gap = 12,
  targetColumnWidth = 260
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(() => setWidth(el.clientWidth));
    resizeObserver.observe(el);
    setWidth(el.clientWidth);
    return () => resizeObserver.disconnect();
  }, []);

  const { positions, contentHeight } = useMasonryLayout({
    items: items.map(({id, width, height}) => ({ id, width, height })),
    containerWidth: width,
    targetColumnWidth,
    gap
  });

  const visibilityRange = useScrollVisibility(ref as React.RefObject<HTMLElement>, 800);

  const visible = useMemo(
    () => positions.filter(({ y, height }) => y + height >= visibilityRange.top && y <= visibilityRange.bottom),
    [positions, visibilityRange]
  );

  return (
    <div ref={ref} style={{ position: "relative", minHeight: contentHeight }}>
      {visible.map((position) => {
        const item = items[position.index];
        const style: React.CSSProperties = {
          position: "absolute",
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: position.width,
          height: position.height
        };
        return (
          <Fragment key={item.id}>{item.render(style)}</Fragment>
        );
      })}
    </div>
  );
}
