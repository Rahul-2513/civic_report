import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getStoredUser, saveStoredUser } from "../../utils/userSession";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#2563EB",
];

const departmentCards = [
  {
    name: "Railway",
    icon: "🚆",
    description: "Report railway related problems",
  },
  {
    name: "Gram Panchayat",
    icon: "🏛",
    description: "Report village civic issues",
  },
  {
    name: "Nagar Nigam",
    icon: "🏙",
    description: "Report city civic complaints",
  },
];

const notificationAccent = {
  "Complaint Assigned": "border-blue-500",
  "Complaint Resolved": "border-green-500",
  "Complaint Updated": "border-orange-500",
  "Complaint Escalated": "border-red-500",
  "Admin Announcement": "border-purple-500",
  System: "border-slate-500",
};

function CitizenDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getStoredUser());
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          profileRes,
          statsRes,
          complaintsRes,
          notificationsRes,
        ] = await Promise.all([
          api.get("/auth/me"),
          api.get("/complaints/dashboard"),
          api.get("/complaints/my-complaints"),
          api.get("/notifications/me"),
        ]);

        setUser(profileRes.data.user);
        saveStoredUser(profileRes.data.user);

        if (statsRes.data.success) {
          setStats(statsRes.data.stats);
        }

        if (complaintsRes.data.success) {
          setComplaints(complaintsRes.data.complaints || []);
        }

        if (notificationsRes.data.success) {
          setNotifications(
            (notificationsRes.data.notifications || []).slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Failed to load citizen dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const latestComplaint = complaints[0] || null;
  const recentComplaints = complaints.slice(0, 5);
  const inProgressCount = Math.max(
    0,
    stats.total -
      stats.pending -
      stats.resolved -
      stats.rejected
  );

  const chartData = [
    { name: "Resolved", value: stats.resolved },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
    { name: "In Progress", value: inProgressCount },
  ].filter((item) => item.value > 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.name || "Citizen"} 👋
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          Together, let's improve our city by reporting civic issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-gray-400 text-lg">
            Total Complaints
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-cyan-400">
            {stats.total}
          </h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-gray-400 text-lg">
            Pending
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-orange-500">
            {stats.pending}
          </h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-gray-400 text-lg">
            Resolved
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-green-500">
            {stats.resolved}
          </h1>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-gray-400 text-lg">
            Rejected
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-red-500">
            {stats.rejected}
          </h1>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          Choose Department
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departmentCards.map((department) => (
            <button
              key={department.name}
              type="button"
              onClick={() => navigate("/report")}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition cursor-pointer text-left"
            >
              <h1 className="text-5xl">
                {department.icon}
              </h1>

              <h2 className="text-2xl font-bold mt-5 text-white">
                {department.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {department.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Latest Complaint Tracking
            </h2>

            <p className="text-gray-400 mt-2">
              Track your latest complaint status
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/my-complaints")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl transition"
          >
            View All Complaints
          </button>
        </div>

        {latestComplaint ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400">
                Complaint ID
              </p>

              <h3 className="text-lg font-semibold mt-2 text-white">
                {latestComplaint._id.slice(-6).toUpperCase()}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Department
              </p>

              <h3 className="text-lg font-semibold mt-2 text-white">
                {latestComplaint.department}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Issue
              </p>

              <h3 className="text-lg font-semibold mt-2 text-white">
                {latestComplaint.category}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Status
              </p>

              <h3 className="text-lg font-semibold mt-2 text-cyan-400">
                {latestComplaint.status}
              </h3>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-800 p-6 text-gray-300 border border-slate-700">
            No complaints submitted yet. Start by reporting your first issue.
          </div>
        )}
      </div>

      <div className="mt-10 bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Recent Complaints
            </h2>

            <p className="text-gray-400 mt-2">
              View your recently submitted complaints
            </p>
          </div>
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-left text-gray-400">
                <th className="p-4 rounded-l-xl">
                  Complaint ID
                </th>
                <th className="p-4">
                  Department
                </th>
                <th className="p-4">
                  Issue
                </th>
                <th className="p-4">
                  Date
                </th>
                <th className="p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentComplaints.length > 0 ? (
                recentComplaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="border-b border-slate-800 hover:bg-slate-800/60 transition text-gray-300"
                  >
                    <td className="p-4 font-semibold text-white">
                      {complaint._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="p-4">
                      {complaint.department}
                    </td>

                    <td className="p-4">
                      {complaint.category}
                    </td>

                    <td className="p-4">
                      {new Date(
                        complaint.createdAt
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          complaint.status === "Resolved"
                            ? "bg-green-100 text-green-600"
                            : complaint.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : complaint.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : complaint.status === "Assigned"
                            ? "bg-blue-100 text-blue-600"
                            : complaint.status === "Escalated"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-400"
                  >
                    No complaints found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-slate-900 p-6 rounded-2xl border border-slate-800 border-l-4 ${
                notificationAccent[notification.type] ||
                "border-slate-500"
              }`}
            >
              <h3 className="text-lg font-semibold text-white">
                {notification.title}
              </h3>

              <p className="text-gray-400 mt-2">
                {notification.message}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 border-l-4 border-slate-500 md:col-span-2 xl:col-span-4">
            <h3 className="text-lg font-semibold text-white">
              No notifications yet
            </h3>

            <p className="text-gray-400 mt-2">
              Complaint updates and announcements will appear here.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">
          Complaint Statistics
        </h2>

        <p className="text-gray-400 mt-2">
          Overview of complaint statuses
        </p>

        <div className="w-full h-[400px] mt-8">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={
                  chartData.length > 0
                    ? chartData
                    : [{ name: "No Data", value: 1 }]
                }
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >
                {(chartData.length > 0
                  ? chartData
                  : [{ name: "No Data", value: 1 }]
                ).map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={
                      chartData.length > 0
                        ? COLORS[index % COLORS.length]
                        : "#CBD5E1"
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CitizenDashboard;
