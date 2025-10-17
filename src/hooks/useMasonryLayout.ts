import { useMemo } from "react";
import { MasonryItem } from "../types";

type Positioned<T extends MasonryItem> = {
  id: T["id"];
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
};

interface MasonryLayoutProps {
  items: MasonryItem[];
  containerWidth: number;
  targetColumnWidth?: number;
  gap?: number;
}

export function useMasonryLayout<T extends MasonryItem>({
  items,
  containerWidth,
  targetColumnWidth = 260,
  gap = 12
}: MasonryLayoutProps) {
  const columnCount = Math.max(
    1,
    Math.floor((containerWidth + gap) / (targetColumnWidth + gap))
  );

  const columnWidth =
    columnCount > 0
      ? Math.floor((containerWidth - gap * (columnCount - 1)) / columnCount)
      : 0;

  const { positions, contentHeight } = useMemo(() => {
    if (containerWidth <= 0 || columnWidth <= 0 || items.length === 0) {
      return { positions: [] as Positioned<T>[], contentHeight: 0 };
    }

    const columnHeights = new Array(columnCount).fill(0) as number[];
    const positionedItems: Positioned<T>[] = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const scale = columnWidth / Math.max(1, item.width);
      const itemHeight = Math.max(1, Math.round(item.height * scale));

      let shortestColumn = 0;
      for (let c = 1; c < columnCount; c++) {
        if (columnHeights[c] < columnHeights[shortestColumn]) {
          shortestColumn = c;
        }
      }

      const x = shortestColumn * (columnWidth + gap);
      const y = columnHeights[shortestColumn];
      columnHeights[shortestColumn] = y + itemHeight + gap;

      positionedItems.push({
        id: item.id,
        x,
        y,
        width: columnWidth,
        height: itemHeight,
        index
      });
    }

    const totalHeight = Math.max(0, ...columnHeights) - gap;
    return { positions: positionedItems, contentHeight: totalHeight };
  }, [items, columnCount, columnWidth, gap, containerWidth]);

  return { columnCount, columnWidth, positions, contentHeight };
}
