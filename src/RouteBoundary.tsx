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
    >
      <Outlet />
    </ErrorBoundary>
  );
}