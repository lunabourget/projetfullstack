import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import authService from "./services/auth.service";

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/dashboard" /> : <AuthPage onLoginSuccess={() => setLoggedIn(true)} />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard onLogout={() => setLoggedIn(false)} />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/dashboard/expenses"
          element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/budgets"
          element={
            <PrivateRoute>
              <Budgets />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        /> */}

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
