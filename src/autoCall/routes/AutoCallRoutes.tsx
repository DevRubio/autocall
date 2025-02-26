import RootLayout from "@/layout";
import { Availables, Clients, Home, LogsCalls, Users } from "@/autoCall/pages";
import { Route, Routes, Navigate } from "react-router-dom";
import { usePermissions } from "@/auth/Permissions/usePermissions";
import { RouteType } from '../components/Interfaces/RouteType';


const ProtectedRoute = ({
  children,
  route,
}: {
  children: React.ReactElement;
  route: RouteType;
}) => {
  const { canAccessRoute } = usePermissions();
  if (route === "/") return children;
  if (!canAccessRoute(route)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const AutoCallRoutes = () => {
  return (
    <RootLayout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute route="/">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="availables"
          element={
            <ProtectedRoute route="availables">
              <Availables />
            </ProtectedRoute>
          }
        />
        <Route
          path="logcalls"
          element={
            <ProtectedRoute route="logcalls">
              <LogsCalls />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute route="users">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="clients"
          element={
            <ProtectedRoute route="clients">
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>No autorizado</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RootLayout>
  );
};