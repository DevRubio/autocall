import { Login } from "@/auth/pages/login";
import { AutoCallRoutes } from "@/autoCall/routes/AutoCallRoutes";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AutoCallRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
