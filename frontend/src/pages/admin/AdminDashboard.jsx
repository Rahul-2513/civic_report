import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
   const navigate = useNavigate();
   const [complaints, setComplaints] = useState([]);
   const [dashboard, setDashboard] = useState(null);
   const [loading, setLoading] = useState(true);
   const [recentComplaints, setRecentComplaints] = useState([]);
 useEffect(() => {fetchDashboard();
 fetchRecentComplaints();
 

 },

 []);

const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      "/admin/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setDashboard(res.data.dashboard);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const fetchComplaints = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      "/admin/complaints",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    setComplaints(res.data.complaints);
  } catch (err) {
    console.log(err);
  }
};
const fetchRecentComplaints = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      "/admin/complaints",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Latest 5 complaints
   const data = res.data.complaints;

setRecentComplaints(data.slice(0, 5));
  } catch (err) {
    console.error(err);
  }
};
if (loading) {
  return (
    <div className="text-white text-xl">
      Loading Dashboard...
    </div>
  );
}
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back, Super Admin
          </p>
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold">
          Generate Report
        </button>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-gray-400">Total Complaints</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.totalComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-yellow-400">Pending Complaints</p>
          <h2 className="text-4xl font-bold text-white mt-3">
           {dashboard.pendingComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-green-400">Resolved Complaints</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.resolvedComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-red-400">Escalated Cases</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.escalatedCases}
          </h2>
        </div>

      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-gray-400">Total Citizens</p>
          <h2 className="text-3xl font-bold text-cyan-400 mt-3">
            {dashboard.totalCitizens}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-gray-400">Total Officers</p>
          <h2 className="text-3xl font-bold text-cyan-400 mt-3">
            {dashboard.totalOfficers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-gray-400">Departments</p>
          <h2 className="text-3xl font-bold text-cyan-400 mt-3">
            {dashboard.departments}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <p className="text-gray-400">Active Officers</p>
          <h2 className="text-3xl font-bold text-cyan-400 mt-3">
            {dashboard.activeOfficers}
          </h2>
        </div>

      </div>

      {/* Department + Officer Performance */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h3 className="text-xl font-semibold text-white mb-5">
            Department Performance
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between text-gray-300">
              <span>Railway Department</span>
              <span>92%</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Nagar Nigam</span>
              <span>81%</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Gram Panchayat</span>
              <span>74%</span>
            </div>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h3 className="text-xl font-semibold text-white mb-5">
            Top Officers
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between text-gray-300">
              <span>Rahul Kumar</span>
              <span>95%</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Amit Singh</span>
              <span>91%</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Ravi Kumar</span>
              <span>88%</span>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Complaints */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

        <h3 className="text-xl font-semibold text-white mb-6">
          Recent Complaints
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700 text-gray-400">

                <th className="text-left py-3">
                  Complaint ID
                </th>

                <th className="text-left py-3">
                  Department
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Priority
                </th>

              </tr>

            </thead>

           
         <tbody>
  {recentComplaints.length > 0 ? (
    recentComplaints.map((complaint) => (
      <tr
        key={complaint._id}
        className="border-b border-slate-800"
      >
        <td className="py-4 text-white">
          {`CMP-${complaint._id.slice(-5).toUpperCase()}`}
        </td>

        <td className="text-gray-300">
          {complaint.department}
        </td>

        <td>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              complaint.status === "Resolved"
                ? "bg-green-600 text-white"
                : complaint.status === "Escalated"
                ? "bg-red-600 text-white"
                : complaint.status === "In Progress"
                ? "bg-blue-600 text-white"
                : complaint.status === "Assigned"
                ? "bg-purple-600 text-white"
                : "bg-yellow-600 text-white"
            }`}
          >
            {complaint.status}
          </span>
        </td>

        <td>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              complaint.priority === "High"
                ? "bg-red-600 text-white"
                : complaint.priority === "Medium"
                ? "bg-yellow-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {complaint.priority}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="4"
        className="text-center py-8 text-gray-400"
      >
        No Recent Complaints
      </td>
    </tr>
  )}

              

            </tbody>

          </table>

        </div>

      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h3 className="text-xl font-semibold text-white mb-4">
            Notifications
          </h3>

          <div className="space-y-3 text-gray-300">

            <p>🔔 New complaint assigned</p>
            <p>🚨 Complaint escalated</p>
            <p>👥 New officer added</p>

          </div>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

  <h3 className="text-xl font-semibold text-white mb-4">
    Quick Actions
  </h3>

  <div className="grid grid-cols-2 gap-4">

    {/* Add Officer */}
    <button
      onClick={() => navigate("/admin/officers?add=true")}
      className="group flex items-center gap-3 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:-translate-y-1 active:scale-95"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
        ➕
      </span>

      <div className="text-left">
        <p className="text-base font-semibold">
          Add Officer
        </p>
        <p className="text-xs text-cyan-100">
          Register a new officer
        </p>
      </div>
    </button>

    {/* Add Department */}
    <button
      onClick={() => navigate("/admin/departments?add=true")}
      className="group flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 active:scale-95"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
        🏢
      </span>

      <div className="text-left">
        <p className="text-base font-semibold">
          Add Department
        </p>
        <p className="text-xs text-green-100">
          Create new department
        </p>
      </div>
    </button>

    {/* View Complaints */}
    <button
      onClick={() => navigate("/admin/complaints")}
      className="group flex items-center gap-3 rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-yellow-700 hover:-translate-y-1 active:scale-95"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
        📋
      </span>

      <div className="text-left">
        <p className="text-base font-semibold">
          View Complaints
        </p>
        <p className="text-xs text-yellow-100">
          Manage all complaints
        </p>
      </div>
    </button>

    {/* Generate Report */}
    <button
      onClick={() => navigate("/admin/reports")}
      className="group flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:-translate-y-1 active:scale-95"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
        📊
      </span>

      <div className="text-left">
        <p className="text-base font-semibold">
          Generate Report
        </p>
        <p className="text-xs text-red-100">
          Analytics & Reports
        </p>
      </div>
    </button>

  </div>

</div>

      </div>

    </div>
  );
}

export default AdminDashboard;
