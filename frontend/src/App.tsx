import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import CustomCursor from "./components/Cursor";
import CGU from "./pages/CGU";
import Dashboard from "./pages/Dashboard";
import authService from "./services/auth.service";
import Header from "./components/header";
import SpiderWebOverlay from "./components/SpiderWebOverlay";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = authService.getToken();
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null = en cours de vérification

  useEffect(() => {
    setLoggedIn(!!authService.getToken());
  }, []);

  if (loggedIn === null) {
    return <div>Chargement...</div>; // ou un loader MUI
  }

  const handleLogout = () => {
    authService.logout(); // supprime le token local
    setLoggedIn(false);
  };

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <>
              <SpiderWebOverlay />
              <AuthPage onLoginSuccess={() => setLoggedIn(true)} />
            </>
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <>
              <SpiderWebOverlay />
              <Header onLogout={handleLogout} />
              <Dashboard />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <>
              <SpiderWebOverlay />
              <Header onLogout={handleLogout} />
              <Expenses />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/budgets"
        element={
          <PrivateRoute>
            <>
              <SpiderWebOverlay />
              <Header onLogout={handleLogout} />
              <Budgets />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/cgu"
        element={
          <PrivateRoute>
            <>
              <Header onLogout={handleLogout} />
              <CGU />
            </>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
