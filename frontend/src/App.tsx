import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/header";
import authService from "./services/auth.service";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = authService.getToken();
  return token ? children : <Navigate to="/" />;
};

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const token = authService.getToken();
  return token ? <Navigate to="/home" /> : children;
};

// Layout pour les routes protégées avec header
const AppLayout: React.FC = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Page login */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <AuthPage />
            </RedirectIfAuthenticated>
          }
        />

        {/* Route principale après login */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Sous-routes protégées avec header */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Ici les routes enfants */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* tu peux ajouter d'autres routes : /app/settings, /app/profile ... */}
        </Route>

        {/* Redirection par défaut si aucune route ne matche */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
