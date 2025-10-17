import { useCallback, useState } from "react";
import { getPhotos } from "../api/getPhotos";
import type { IPhoto } from "../types";

export function useLoadPhotos(perPage = 30) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const loadPage = useCallback(
    async (query: string, page: number) => {
      setLoading(true);
      try {
        const res = await getPhotos(query || undefined, page, perPage);
        const photos: IPhoto[] = res.photos ?? [];
        setPhotos((prev) => (page === 1 ? photos : prev.concat(photos)));
        setHasMore(Boolean(res.next_page) && photos.length > 0);
      } catch (e) {
        console.error("Failed to fetch photos:", e);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  );

  return { photos, loading, hasMore, loadPage, setPhotos };
}
