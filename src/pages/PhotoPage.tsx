import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPhotoById } from "../api/getPhotos";
import type { IPhoto } from "../types";

export default function PhotoPage() {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<IPhoto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    getPhotoById(id)
      .then(setPhoto)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) return null;
  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (error)
    return (
      <div style={{ padding: 24 }}>
        <p style={{ color: "crimson" }}>Loading Issue: {error}</p>
        <Link to="/">Back to gallery</Link>
      </div>
    );
  if (!photo) return null;

  return (
    <div style={{ padding: 24 }}>
      <Link to="/" style={{ textDecoration: "none", color: "#007aff" }}>
        Back to gallery
      </Link>

      <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
        <img
          src={photo.src?.large2x || photo.src?.large}
          alt={photo.alt || "photo"}
          style={{
            width: "100%",
            maxWidth: 1200,
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        />

        <div style={{ lineHeight: 1.5 }}>
          <h2 style={{ marginBottom: 8 }}>
            {photo.alt || `Photo #${photo.id}`}
          </h2>
          <p>
            <strong>Photographer:</strong>{" "}
            <a
              href={photo.photographer_url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#007aff" }}
            >
              {photo.photographer}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
