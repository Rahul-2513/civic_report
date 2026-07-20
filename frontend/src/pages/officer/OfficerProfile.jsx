import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { saveStoredUser } from "../../utils/userSession";

function OfficerProfile() {
  const navigate = useNavigate();
  const [officer, setOfficer] = useState(null);
  const [dashboard, setDashboard] = useState({
    assignedComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    escalatedComplaints: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficerProfile = async () => {
      try {
        const [userRes, dashboardRes, complaintsRes] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/officer/dashboard"),
            api.get("/officer/complaints"),
          ]);

        setOfficer(userRes.data.user);
        saveStoredUser(userRes.data.user);

        if (dashboardRes.data.success) {
          setDashboard(dashboardRes.data.dashboard);
        }

        if (complaintsRes.data.success) {
          setComplaints(complaintsRes.data.complaints || []);
        }
      } catch (error) {
        console.error("Failed to load officer profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficerProfile();
  }, []);

  const recentActivity = complaints.slice(0, 5).map((complaint) => ({
    id: complaint._id,
    status: complaint.status,
    label:
      complaint.status === "Resolved"
        ? `Resolved complaint ${complaint._id.slice(-6).toUpperCase()}`
        : complaint.status === "Escalated"
        ? `Escalated complaint ${complaint._id.slice(-6).toUpperCase()}`
        : complaint.status === "In Progress"
        ? `Working on complaint ${complaint._id.slice(-6).toUpperCase()}`
        : complaint.status === "Assigned"
        ? `Assigned complaint ${complaint._id.slice(-6).toUpperCase()}`
        : `Pending complaint ${complaint._id.slice(-6).toUpperCase()}`,
    timestamp: complaint.updatedAt || complaint.createdAt,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (!officer) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xl">
        Officer profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Officer information and performance
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/officer/settings")}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-slate-900 rounded-2xl p-8">
          <div className="flex flex-col items-center">
            {officer.profileImage ? (
              <img
                src={officer.profileImage}
                alt={officer.name}
                className="w-28 h-28 rounded-full border-4 border-cyan-500 object-cover"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-cyan-600 flex items-center justify-center text-4xl font-bold">
                {officer.name?.charAt(0)?.toUpperCase() || "O"}
              </div>
            )}

            <h2 className="text-2xl font-bold mt-5">
              {officer.name}
            </h2>

            <p className="text-cyan-400 mt-2">
              {officer.post || "Officer"}
            </p>

            <p className="text-gray-400">
              {officer.department || "Department not assigned"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Officer Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400">
                Employee ID
              </p>

              <p className="font-semibold mt-1">
                {officer.employeeId || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Department
              </p>

              <p className="font-semibold mt-1">
                {officer.department || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Designation
              </p>

              <p className="font-semibold mt-1">
                {officer.post || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Email
              </p>

              <p className="font-semibold mt-1">
                {officer.email}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Phone
              </p>

              <p className="font-semibold mt-1">
                {officer.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Joining Date
              </p>

              <p className="font-semibold mt-1">
                {officer.createdAt
                  ? new Date(officer.createdAt).toLocaleDateString(
                      "en-IN"
                    )
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Last Login
              </p>

              <p className="font-semibold mt-1">
                {officer.lastLogin
                  ? new Date(officer.lastLogin).toLocaleString(
                      "en-IN"
                    )
                  : "No login activity"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Account Status
              </p>

              <p className="font-semibold mt-1">
                {officer.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Complaints
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {dashboard.assignedComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Resolved
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {dashboard.resolvedComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            In Progress
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {dashboard.inProgressComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Escalated
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            {dashboard.escalatedComplaints}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="bg-slate-800 p-4 rounded-xl flex items-center justify-between gap-4"
              >
                <span>{activity.label}</span>
                <span className="text-sm text-slate-400">
                  {new Date(activity.timestamp).toLocaleString("en-IN")}
                </span>
              </div>
            ))
          ) : (
            <div className="bg-slate-800 p-4 rounded-xl text-slate-400">
              No recent complaint activity found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfficerProfile;
