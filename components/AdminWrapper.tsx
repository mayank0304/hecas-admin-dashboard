"use client";

import { useState } from "react";
import AdminAuth from "./AdminAuth";

interface AdminWrapperProps {
  children: React.ReactNode;
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return <>{children}</>;
}
