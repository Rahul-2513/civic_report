
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function AssignedComplaints() {

const [search, setSearch] = useState("");
  
const [complaints, setComplaints] = useState([]);
const [stats, setStats] = useState({});
const [loading, setLoading] = useState(true);
const navigate = useNavigate();


const fetchComplaints = async () => {
  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [dashboardRes, complaintsRes] = await Promise.all([
      api.get(
        "/officer/dashboard",
        { headers }
      ),
      api.get(
        "/officer/complaints",
        { headers }
      ),
    ]);
    

    setStats(dashboardRes.data.dashboard || {});
    setComplaints(complaintsRes.data.complaints || []);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const handleEscalate = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.put(
      `/officer/complaints/${id}/escalate`,
      {
        reason: "Need higher authority approval."
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Complaint escalated successfully");

    fetchComplaints();

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Escalation failed");
  }
};

const handleResolve = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.put(
      `/officer/complaints/${id}/status`,
      {
        status: "Resolved"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Complaint resolved successfully");

    fetchComplaints();

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Resolve failed");
  }
};

useEffect(() => {
  fetchComplaints();
}, []);
  

 const filteredComplaints = complaints.filter((item) =>
  item._id.toLowerCase().includes(search.toLowerCase()) ||
  item.title.toLowerCase().includes(search.toLowerCase())
);

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-white text-xl">
      Loading Complaints...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Assigned Complaints
          </h1>

          <p className="text-gray-400 mt-1">
            Manage and track assigned complaints
          </p>
        </div>

      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 rounded-2xl p-5 mb-6">

        <input
          type="text"
          placeholder="Search Complaint ID or Issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
        />

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Assigned
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.assignedComplaints || 0}
            </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {stats.pendingComplaints || 0}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Resolved
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {stats.resolvedComplaints || 0}
          </h2>
        </div>

      </div>

      {/* Complaint Table */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-xl font-bold">
            Complaint List
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4">
                  Complaint ID
                </th>

                <th className="text-left px-6 py-4">
                  Issue
                </th>

                <th className="text-left px-6 py-4">
                  Location
                </th>

                <th className="text-left px-6 py-4">
                  Priority
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>

                <th className="text-left px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

           <tbody>
  {filteredComplaints.length > 0 ? (
    filteredComplaints.map((item) => (
      <tr
        key={item._id}
        className="border-b border-slate-800 hover:bg-slate-800/40"
      >
        <td className="px-6 py-4 font-semibold">
          {item._id.slice(-8).toUpperCase()}
        </td>

        <td className="px-6 py-4">
          {item.title}
        </td>

        <td className="px-6 py-4">
          {item.location?.address}
        </td>

        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.priority === "High"
                ? "bg-red-500/20 text-red-400"
                : item.priority === "Medium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {item.priority}
          </span>
        </td>

        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.status === "Resolved"
                ? "bg-green-500/20 text-green-400"
                : item.status === "Pending"
                ? "bg-yellow-500/20 text-yellow-400"
                : item.status === "Escalated"
                ? "bg-red-500/20 text-red-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {item.status}
          </span>
        </td>

        <td className="px-6 py-4">
          {new Date(item.createdAt).toLocaleDateString("en-IN")}
        </td>

        <td className="px-6 py-4 flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/officer/complaint/${item._id}`)}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
          >
            View
          </button>

<button
  type="button"
  onClick={() => handleResolve(item._id)}
  disabled={item.status === "Resolved"}
  className="bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:text-slate-400 px-4 py-2 rounded-lg"
>
  Resolve
</button>

<button
  type="button"
  onClick={() => handleEscalate(item._id)}
  disabled={item.status === "Escalated" || item.status === "Resolved"}
  className="bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:text-slate-400 px-4 py-2 rounded-lg"
>
  Escalate
</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="7"
        className="text-center py-10 text-gray-400"
      >
        No Assigned Complaints
      </td>
    </tr>
  )}
</tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AssignedComplaints;


