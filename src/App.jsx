import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Leads from "./Pages/Leads";
import AddLead from "./Pages/AddLead";
import Reports from "./Pages/Reports";
import Users from "./Pages/Users";
import Settings from "./Pages/Settings";

// Layout
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ProtectedRoute from "./Components/ProtectedRoute";

import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Leads />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-lead"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AddLead />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Reports />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Only Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <AppLayout>
                <Users />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute role="admin">
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
