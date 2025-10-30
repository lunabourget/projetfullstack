import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/header";
import authService from "./services/auth.service";

const AppLayout: React.FC = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const PrivateRoute: React.FC<{ children: JSX.Element; loggedIn: boolean }> = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to="/" />;
};

const RedirectIfAuthenticated: React.FC<{ children: JSX.Element; loggedIn: boolean }> = ({ children, loggedIn }) => {
  return loggedIn ? <Navigate to="/home" /> : children;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = authService.getToken();
    setLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Page login */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated loggedIn={loggedIn}>
              <AuthPage onLoginSuccess={() => setLoggedIn(true)} />
            </RedirectIfAuthenticated>
          }
        />

        {/* Page principale après login */}
        <Route
          path="/home"
          element={
            <PrivateRoute loggedIn={loggedIn}>
              <Dashboard onLogout={() => setLoggedIn(false)} />
            </PrivateRoute>
          }
        />

        {/* Layout pour les routes protégées avec Header */}
        <Route
          path="/app"
          element={
            <PrivateRoute loggedIn={loggedIn}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Routes enfants */}
          <Route path="dashboard" element={<Dashboard onLogout={() => setLoggedIn(false)} />} />
          {/* autres routes protégées ici */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
