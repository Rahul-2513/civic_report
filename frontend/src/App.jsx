import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Protected Route */
import ProtectedRoute from "./components/protectedRoute";
import { clearStoredUser } from "./utils/userSession";

/* Layout */
import MainLayout from "./layouts/MainLayout";

/* ================= AUTH PAGES ================= */

import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";




/* ================= CITIZEN PAGES ================= */

import Dashboard from "./pages/citizen/Citizendashboard";
import Report from "./pages/citizen/Report";
import Track from "./pages/citizen/Track";
import Contact from "./pages/citizen/Contact";


import Profile from "./pages/citizen/Profile";
import Notifications from "./pages/citizen/Notifications";
import Settings from "./pages/citizen/Settings";
import Support from "./pages/citizen/Support";
import MyComplaints from "./pages/citizen/MyComplaints";
import Departments from "./pages/citizen/Departments";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";

/* OFFICER PAGES */

import OfficerDashboard from "./pages/officer/OfficerDashboard";
import OfficerLayout from "./layouts/OfficerLayout";
import AssignedComplaints from "./pages/officer/AssignedComplaints";
import OfficerComplaintDetails from "./pages/officer/ComplaintDetails";
import EscalationRequests from "./pages/officer/EscalationRequests";
import OfficerNotifications from "./pages/officer/OfficerNotifications";
import OfficerProfile from "./pages/officer/OfficerProfile";
import ReportsAnalytics from "./pages/officer/ReportsAnalytics";
import ComplaintTracking from "./pages/officer/ComplaintTracking";
import OfficerSettings from "./pages/officer/OfficerSettings";
import OfficerPerformance from "./pages/officer/OfficerPerformance";
import CitizenFeedback from "./pages/officer/CitizenFeedback";

/// admin page
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageOfficers from "./pages/admin/ManageOfficers";
import ManageCitizens from "./pages/admin/ManageCitizens";
import ManageDepartments from "./pages/admin/ManageDepartments";
import AllComplaints from "./pages/admin/AllComplaints";
import EscalationManagement from "./pages/admin/EscalationManagement";
import AnalyticsReports from "./pages/admin/AnalyticsReports";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import Announcements from "./pages/admin/Announcements";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";

import AdminLayout from "./layouts/AdminLayout";

const IDLE_TIMEOUT_MS = 10 * 60 * 1000;
const publicPaths = new Set([
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/change-password",
]);

function SessionTimeoutManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    const isResetPasswordRoute =
      location.pathname.startsWith("/reset-password/");
    const isPublicRoute =
      publicPaths.has(location.pathname) || isResetPasswordRoute;

    const clearTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const logoutUser = () => {
      clearTimer();
      localStorage.clear();
      clearStoredUser();
      alert("Session expired due to 10 minutes of inactivity.");
      navigate("/login", { replace: true });
    };

    const resetTimer = () => {
      clearTimer();

      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || !role || isPublicRoute) {
        return;
      }

      timerRef.current = window.setTimeout(
        logoutUser,
        IDLE_TIMEOUT_MS
      );
    };

    resetTimer();

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer);
    });

    document.addEventListener(
      "visibilitychange",
      resetTimer
    );

    return () => {
      clearTimer();

      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });

      document.removeEventListener(
        "visibilitychange",
        resetTimer
      );
    };
  }, [location.pathname, navigate]);

  return null;
}

function App() {

  return (

    <BrowserRouter>

      <SessionTimeoutManager />

      <Routes>

      

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
         <Route
               path="/forgot-password"
             element={<ForgotPassword />}
              />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
               />

                   <Route
                      path="/change-password"
                      element={<ChangePassword />}
                          />


        {/* ================= CITIZEN ROUTES ================= */}

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Dashboard />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Report */}

        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Report />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Track */}

        <Route
          path="/track"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Track />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Contact */}

        <Route
          path="/contact"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Contact />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* My Complaints */}

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <MyComplaints />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Notifications */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Notifications />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Departments */}

        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Departments />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Profile />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Settings />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Support */}

        <Route
          path="/support"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <Support />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* Complaint Details */}

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute allowedRole="citizen">

              <MainLayout>

                <ComplaintDetails />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ================= OFFICER ROUTES ================= */}

        {/* Officer Dashboard */}

        
              <Route
  path="/officer/dashboard"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <OfficerDashboard />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/escalation"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <EscalationRequests />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>                    
                      <Route
  path="/officer/notifications"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <OfficerNotifications />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/complaint/:id"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <OfficerComplaintDetails />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
    <Route
  path="/officer/complaints"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <AssignedComplaints />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/profile"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <OfficerProfile />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/reports"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <ReportsAnalytics />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/tracking"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <ComplaintTracking />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/settings"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <OfficerSettings />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/performance"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <OfficerPerformance />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/officer/feedback"
  element={
    <ProtectedRoute allowedRole="officer">
      <OfficerLayout>
        <CitizenFeedback />
      </OfficerLayout>
    </ProtectedRoute>
  }
/>
     /// admin routes
     <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/officers"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <ManageOfficers />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/citizens"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <ManageCitizens />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/departments"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <ManageDepartments />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/complaints"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AllComplaints />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/escalations"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <EscalationManagement />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/analytics"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AnalyticsReports />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/feedback"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <FeedbackManagement />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/announcements"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <Announcements />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/notifications"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AdminNotifications />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/auditlogs"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AuditLogs />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/profile"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AdminProfile />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/settings"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminLayout>
        <AdminSettings />
      </AdminLayout>
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
