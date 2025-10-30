import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import authService from "./services/auth.service";
import Header from "./components/header";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = authService.getToken();
  return token ? children : <Navigate to="/" />;
};

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = authService.getToken();
    if (token) navigate("/dashboard");
  }, [navigate]);
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <AuthPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/app/*"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
