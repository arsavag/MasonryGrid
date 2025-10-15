import React, { memo } from "react";
import { Link } from "react-router-dom";

import "../styles.css";

interface IPhotoCardProps {
  id: number | string;
  src: string;
  alt: string;
  width: number;
  height: number;
  style: React.CSSProperties;
}

export default memo(function PhotoCard({
  id,
  src,
  alt,
  width,
  height,
  style,
}: IPhotoCardProps) {
  const ratio = (height / width) * 100;

  return (
    <div style={{ ...style }}>
      <Link to={`/photo/${id}`}>
        <div className="photo-card"
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: `${ratio}%`,
            overflow: "hidden",
            borderRadius: 8,
            background: "#f3f3f3",
          }}
        >
          <img
            loading="lazy"
            src={src}
            alt={alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Link>
    </div>
  );
});
