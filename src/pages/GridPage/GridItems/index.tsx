import { useMemo, memo } from "react";
import { IPhoto } from "../../../types";
import PhotoCard from "./PhotoCard";

interface IGridItemsProps {
  photos: IPhoto[];
}

export default function GridItems({ photos }: IGridItemsProps) {
  return useMemo(
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
        ),
      })),
    [photos]
  );
}