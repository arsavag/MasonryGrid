import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

type Props = {
  fallback?: React.ReactNode;
};

export default function RouteBoundary({ fallback }: Props) {
  const location = useLocation();

  return (
    <ErrorBoundary
      key={location.key}
      fallback={
        fallback ?? (
          <div style={{ padding: 24 }}>
            Something went wrong in this section. Try refreshing or navigate back.
          </div>
        )
      }
    >
      <Outlet />
    </ErrorBoundary>
  );
}