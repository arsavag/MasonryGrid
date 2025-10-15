import { useRef, useState, useEffect } from "react"
import { useLoadPhotos } from "@/hooks/useLoadPhotos";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MasonryGridFromPhotos from "./MasonryGridFromPhotos";

const PER_PAGE = 30;

export default function GridPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const infiniteTriggerRef = useRef<HTMLDivElement | null>(null);
  
  const { items: photos, loading, hasMore, loadPage } = useLoadPhotos(PER_PAGE);

  useEffect(() => {
    setPage(1);
    loadPage(query, 1);
  }, [query, loadPage]);

  useInfiniteScroll(infiniteTriggerRef as React.RefObject<HTMLElement>, () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    loadPage(query, next);
  });

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фотографий…"
          style={{ flex: 1, padding: 8, borderRadius: 8 }}
        />
      </header>

      <MasonryGridFromPhotos photos={photos} />
      <div ref={infiniteTriggerRef} style={{ height: 1 }} />
      {loading && <p style={{ textAlign: "center", padding: 16 }}>Загрузка…</p>}
    </div>
  )
}