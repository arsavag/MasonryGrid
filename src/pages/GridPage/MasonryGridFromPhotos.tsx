import React, { useMemo } from "react";
import MasonryGrid from "./MasonryGrid";
import PhotoCard from "./GridItems/PhotoCard";
import type { IPhoto } from "../../types";

interface Props {
  photos: IPhoto[];
  gap?: number;
  targetColWidth?: number;
}

function MasonryGridFromPhotos({ photos, gap = 12, targetColWidth = 260 }: Props) {
  const items = useMemo(
    () =>
      photos.map((p) => ({
        id: p.id,
        width: p.width,
        height: p.height,
        render: (style: React.CSSProperties) => (
          <PhotoCard
            key={p.id}
            id={p.id}
            src={p.src.large}
            alt={p.alt || `Photo by ${p.photographer}`}
            width={p.width}
            height={p.height}
            style={style}
          />
        )
      })),
    [photos]
  );

  return <MasonryGrid items={items} gap={gap} targetColWidth={targetColWidth} />;
}

export default React.memo(MasonryGridFromPhotos);
