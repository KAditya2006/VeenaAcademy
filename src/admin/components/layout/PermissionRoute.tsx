import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { PermissionKey } from "../../types";
import { useAdminAuth } from "../../lib/auth";
import AccessDeniedPage from "../../pages/AccessDeniedPage";

export function PermissionRoute({ permission }: { permission: PermissionKey }) {
  const { isAuthenticated, isInitializing, hasPermission } = useAdminAuth();
  const location = useLocation();
  if (isInitializing) return null;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (!hasPermission(permission)) return <AccessDeniedPage />;
  return <Outlet />;
}
