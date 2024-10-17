import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import RootLayout from "./layouts/RootLayout";
import Navbar from "./UserNavbar";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminComplaints from "./pages/AdminComplaints";
import AdminSettings from "./pages/AdminSettings";
import UserNavbar from "./UserNavbar";
import UserSendComplaint from "./pages/UserSendComplaint";
import UserComplaints from "./pages/UserComplaints";
import UserSettings from "./pages/UserSettings";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Complaints from "./pages/Complaints";

import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRouteUser from "./routes/ProtectedRouteUser";
import ProtectedRouteAdmin from "./routes/ProtectedRouteAdmin";
import { useAuth } from "./context/AuthContext";
import { auth } from "./firebase";
import MaintenanceLayout from "./layouts/MaintenanceLayout";
import MaintenanceComplaints from "./pages/MaintenanceComplaints";
import SecurityLayout from "./layouts/SecurityLayout";
import SecurityComplaints from "./pages/SecurityComplaints";
import ProtectedRouteMaintenance from "./routes/ProtectedRouteMaintenance";
import ProtectedRouteSecurity from "./routes/ProtectedRouteSecurity";
{
  /** */
}

function App() {
  // const { auth } = useAuth();
  let [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <AuthProvider>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/maintenance"
                element={
                  <ProtectedRouteMaintenance user={user}>
                    <MaintenanceLayout />
                  </ProtectedRouteMaintenance>
                }
              >
                <Route index element={<MaintenanceComplaints />} />
                <Route
                  path="/maintenance/complaints/:id"
                  element={<Complaints />}
                />
              </Route>

              <Route
                path="/security"
                element={
                  <ProtectedRouteSecurity user={user}>
                    <SecurityLayout />
                  </ProtectedRouteSecurity>
                }
              >
                <Route index element={<SecurityComplaints />} />
                <Route
                  path="/security/complaints/:id"
                  element={<Complaints />}
                />
              </Route>

              <Route
                path="/admin"
                element={
                  <ProtectedRouteAdmin user={user}>
                    <AdminLayout />
                  </ProtectedRouteAdmin>
                }
              >
                <Route index element={<AdminComplaints />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/complaints/:id" element={<Complaints />} />
              </Route>

              <Route
                path="/user"
                element={
                  <ProtectedRouteUser user={user}>
                    <UserLayout />
                  </ProtectedRouteUser>
                }
              >
                <Route index element={<UserSendComplaint />} />
                <Route path="/user/complaints" element={<UserComplaints />} />
                <Route path="/user/settings" element={<UserSettings />} />
              </Route>
            </Route>
          )
        )}
      />
    </AuthProvider>
  );
}

export default App;
