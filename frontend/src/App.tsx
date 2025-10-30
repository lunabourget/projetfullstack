import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import CGU from "./pages/CGU";
import Dashboard from "./pages/Dashboard";
import authService from "./services/auth.service";
import Header from "./components/header";

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
    return <div>Chargement...</div>; // ou un loader MUI si tu veux
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <AuthPage onLoginSuccess={() => setLoggedIn(true)} />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <>
              <Header />
              <Dashboard onLogout={() => setLoggedIn(false)} />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <>
              <Header />
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
              <Header />
              <Budgets />
            </>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
