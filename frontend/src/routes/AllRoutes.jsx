import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Lists from "../pages/Lists";
import CreateList from "../pages/CreateList";
import ListDetails from "../pages/ListDetails";
import AddItem from "../pages/AddItem";
import History from "../pages/History";
import Profile from "../pages/Profile";

import ProtectedRoute from "../components/ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists"
        element={
          <ProtectedRoute>
            <Lists />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists/create"
        element={
          <ProtectedRoute>
            <CreateList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists/:id"
        element={
          <ProtectedRoute>
            <ListDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists/:id/add-item"
        element={
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Landing />}
      />
    </Routes>
  );
};

export default AllRoutes;