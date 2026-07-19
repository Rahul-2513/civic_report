import { useEffect, useState } from "react";
import api from "../../services/api";
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

function CitizenDashboard() {
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  resolved: 0,
  rejected: 0,
});
const [loading, setLoading] = useState(true);
const user = JSON.parse(localStorage.getItem("user") || "{}");
const fetchDashboardStats = async () => {
  try {
    const res = await api.get("/complaints/dashboard");
 if (res.data.success) {
      setStats(res.data.stats);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchDashboardStats();
}, []);
const data = [
  { name: "Resolved", value: stats.resolved },
  { name: "Pending", value: stats.pending },
  { name: "Rejected", value: stats.rejected },
  {
    name: "In Progress",
    value: Math.max(
      0,
      stats.total -
        stats.pending -
        stats.resolved -
        stats.rejected
    ),
  },
];

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-xl">
      Loading Dashboard...
    </div>
  );
}
  return (

    <div>

      {/* Welcome Banner Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white">

        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.name} 👋
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          Together, let's improve our city by reporting civic issues.
        </p>

      </div> 

      {/* Summary Cards Section */}
      <div className="grid grid-cols-4 gap-6 mt-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h3 className="text-gray-500 text-lg">
            Total Complaints
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-blue-600">
           {stats.total}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h3 className="text-gray-500 text-lg">
            Pending
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-orange-500">
           {stats.pending}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h3 className="text-gray-500 text-lg">
            Resolved
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-green-500">
            {stats.resolved}
          </h1>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h3 className="text-gray-500 text-lg">
            Rejected
          </h3>

          <h1 className="text-4xl font-bold mt-4 text-red-500">
            {stats.rejected}
          </h1>

        </div>

      </div>

      {/* Department Selection Section */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Choose Department
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer">

            <h1 className="text-5xl">
              🚆
            </h1>

            <h2 className="text-2xl font-bold mt-5">
              Railway
            </h2>

            <p className="text-gray-500 mt-2">
              Report railway related problems
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer">

            <h1 className="text-5xl">
              🏛
            </h1>

            <h2 className="text-2xl font-bold mt-5">
              Gram Panchayat
            </h2>

            <p className="text-gray-500 mt-2">
              Report village civic issues
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer">

            <h1 className="text-5xl">
              🏙
            </h1>

            <h2 className="text-2xl font-bold mt-5">
              Nagar Nigam
            </h2>

            <p className="text-gray-500 mt-2">
              Report city civic complaints
            </p>

          </div>

        </div>

      </div>

      {/* Complaint Tracking Section */}
      <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Latest Complaint Tracking
            </h2>

            <p className="text-gray-500 mt-2">
              Track your latest complaint status
            </p>

          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition">

            View Full Tracking

          </button>

        </div>

        <div className="mt-8 grid grid-cols-4 gap-6">

          <div>

            <p className="text-gray-500">
              Complaint ID
            </p>

            <h3 className="text-lg font-semibold mt-2">
              CIV1024
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Department
            </p>

            <h3 className="text-lg font-semibold mt-2">
              Nagar Nigam
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Issue
            </p>

            <h3 className="text-lg font-semibold mt-2">
              Garbage Issue
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Status
            </p>

            <h3 className="text-lg font-semibold mt-2 text-blue-600">
              In Progress
            </h3>

          </div>

        </div>

      </div>

      {/* Recent Complaints Table */}
      <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Complaints
            </h2>

            <p className="text-gray-500 mt-2">
              View your recently submitted complaints
            </p>

          </div>

        </div>

        <div className="overflow-x-auto mt-8">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100 text-left">

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

          </table>

        </div>

      </div>

      {/* Notification Panel Section */}
      <div className="mt-10 grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">

          <h3 className="text-lg font-semibold text-gray-800">
            Complaint Assigned
          </h3>

          <p className="text-gray-500 mt-2">
            Your garbage complaint has been assigned.
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">

          <h3 className="text-lg font-semibold text-gray-800">
            Complaint Resolved
          </h3>

          <p className="text-gray-500 mt-2">
            Your railway complaint has been resolved.
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500">

          <h3 className="text-lg font-semibold text-gray-800">
            In Progress
          </h3>

          <p className="text-gray-500 mt-2">
            Water leakage issue is under process.
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">

          <h3 className="text-lg font-semibold text-gray-800">
            Officer Response
          </h3>

          <p className="text-gray-500 mt-2">
            Officer has responded to your complaint.
          </p>

        </div>

      </div>

      {/* Complaint Statistics Chart */}
      <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm">

        <h2 className="text-2xl font-bold text-gray-800">
          Complaint Statistics
        </h2>

        <p className="text-gray-500 mt-2">
          Overview of complaint statuses
        </p>

        <div className="w-full h-[400px] mt-8">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
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