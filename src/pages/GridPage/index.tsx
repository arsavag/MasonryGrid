import { useRef, useState, useEffect } from "react"
import { useLoadPhotos } from "../../hooks/useLoadPhotos";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import MasonryGridFromPhotos from "./MasonryGridFromPhotos";

import "./styles.css";

const PER_PAGE = 30;

export default function GridPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const infiniteTriggerRef = useRef<HTMLDivElement | null>(null);
  
  const { photos, loading, hasMore, loadPage } = useLoadPhotos(PER_PAGE);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      window.clearTimeout(id);
    };
  }, [query]);

  useEffect(() => {
    setPage(1);
    loadPage(debouncedQuery, 1);
  }, [debouncedQuery, loadPage]);

  useInfiniteScroll(infiniteTriggerRef as React.RefObject<HTMLElement>, () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    loadPage(debouncedQuery, next);
  });

  const isEmptyResult = !loading && photos.length === 0;

  return (
    <div style={{ padding: 16 }}>
      <header className="header">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search photos..."
        />
      </header>
      {isEmptyResult ? (<p className="no-results">No results found.</p>) : (
        <MasonryGridFromPhotos photos={photos} />
      )}
      <div ref={infiniteTriggerRef} style={{ height: 1 }} />
      {loading && <p className="loading">Loading...</p>}
    </div>
  )
}