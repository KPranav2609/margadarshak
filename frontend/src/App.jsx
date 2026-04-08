import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskPage from "./pages/TaskPage";
import Mentor from "./pages/Mentor";
import Layout from "./components/Layout";

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes (NO sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes (WITH sidebar) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Layout>
                <TaskPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor"
          element={
            <PrivateRoute>
              <Layout>
                <Mentor />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* ✅ Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;