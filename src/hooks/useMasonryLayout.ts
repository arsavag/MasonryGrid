import { useMemo } from "react";

export interface MasonryItem {
  id: string | number;
  width: number;
  height: number;
}

type Positioned<T extends MasonryItem> = {
  id: T["id"];
  x: number;
  y: number;
  w: number;
  h: number;
  index: number;
};

export function useMasonryLayout<T extends MasonryItem>({
  items,
  containerWidth,
  targetColWidth = 260,
  gap = 12
}: {
  items: T[];
  containerWidth: number;
  targetColWidth?: number;
  gap?: number;
}) {
  const cols = Math.max(
    1,
    Math.floor((containerWidth + gap) / (targetColWidth + gap))
  );
  const columnWidth =
    cols > 0 ? Math.floor((containerWidth - gap * (cols - 1)) / cols) : 0;

  const { positions, contentHeight } = useMemo(() => {
    if (containerWidth <= 0 || columnWidth <= 0 || items.length === 0) {
      return { positions: [] as Positioned<T>[], contentHeight: 0 };
    }

    const colYs = new Array(cols).fill(0) as number[];
    const pos: Positioned<T>[] = [];

    for (let index = 0; index < items.length; index++) {
      const it = items[index];
      const scale = columnWidth / Math.max(1, it.width);
      const h = Math.max(1, Math.round(it.height * scale));

      let minCol = 0;
      for (let c = 1; c < cols; c++) {
        if (colYs[c] < colYs[minCol]) minCol = c;
      }

      const x = minCol * (columnWidth + gap);
      const y = colYs[minCol];
      colYs[minCol] = y + h + gap;

      pos.push({ id: it.id, x, y, w: columnWidth, h, index });
    }

    const contentHeight = Math.max(0, ...colYs) - gap;
    return { positions: pos, contentHeight };
  }, [items, cols, columnWidth, gap, containerWidth]);

  return { cols, columnWidth, positions, contentHeight };
}
