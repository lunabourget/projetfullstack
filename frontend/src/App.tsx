import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AddExpense from "./pages/AddExpense";
import Dashboard from "./pages/Dashboard";
import authService from "./services/auth.service";
import Header from "./components/header";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = authService.getToken();
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!authService.getToken());
  }, []);

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
  path="/dashboard/expenses/add"
  element={
    <PrivateRoute>
      <AddExpense />
    </PrivateRoute>
  }
/>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
