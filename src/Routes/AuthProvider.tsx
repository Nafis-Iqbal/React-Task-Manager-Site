import { Navigate, useLocation } from "react-router-dom";
import { useAuthSelector } from "../Hooks/StateHooks"; // Update path as needed
import React from "react";

const RequireAuth = ({ children }: { children: React.JSX.Element }) => {
  //const isAuthenticated = useAuthSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'; // Ensure it returns a boolean
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login, preserving the intended destination
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
