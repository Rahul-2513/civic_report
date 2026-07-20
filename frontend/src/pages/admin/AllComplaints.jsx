import { useState, useEffect } from "react";
import api from "../../services/api";
import AssignOfficerModal from "./AssignOfficerModal";
import ViewComplaintModal from "./ViewComplaintModal";
import EscalateModal from "./EscalateModal";

function AllComplaints() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [search, setSearch] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [stats, setStats] = useState({
        totalComplaints: 0,
        pendingComplaints: 0,
        resolvedComplaints: 0,
        escalatedComplaints: 0,
      });
  useEffect(() => {
  fetchComplaints();
}, []);

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

    const data = res.data.complaints;

    setComplaints(data);

    setStats({
      totalComplaints: data.length,
      pendingComplaints: data.filter(c => c.status === "Pending").length,
      resolvedComplaints: data.filter(c => c.status === "Resolved").length,
      escalatedComplaints: data.filter(c => c.status === "Escalated").length,
    });

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const filteredComplaints = complaints.filter((complaint) => {
  const complaintId = complaint._id || "";
  const citizenName = complaint.citizen?.name || "";
  const department = complaint.department || "";

  return (
    complaintId.toLowerCase().includes(search.toLowerCase()) ||
    citizenName.toLowerCase().includes(search.toLowerCase()) ||
    department.toLowerCase().includes(search.toLowerCase())
  );
});
 if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-white text-2xl">
      Loading...
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>
          <h1 className="text-4xl font-bold text-white">
            All Complaints
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor and manage all complaints across departments.
          </p>
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold mt-4 md:mt-0">
          Export Report
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-gray-400">Total Complaints</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.totalComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-yellow-400">Pending</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.pendingComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-green-400">Resolved</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.resolvedComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-red-400">Escalated</p>
          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.escalatedComplaints}

          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <input
          type="text"
          placeholder="Search by Complaint ID, Citizen or Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
        />

      </div>

      {/* Complaints Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Complaint Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4 text-gray-300">
                  Complaint ID
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Citizen
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Priority
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                 Officer
                    </th>
                <th className="text-left px-6 py-4 text-gray-300">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Actions
                </th>

              </tr>

            </thead>
<tbody>
  {filteredComplaints.length > 0 ? (
    filteredComplaints.map((complaint) => (
      <tr
        key={complaint._id}
        className="border-b border-slate-800 hover:bg-slate-800/40"
      >
        <td className="px-6 py-4 text-white">
          {`CMP-${complaint._id.slice(-5).toUpperCase()}`}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {complaint.citizen?.name}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {complaint.department}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {complaint.title}
        </td>

        <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      complaint.status === "Pending"
        ? "bg-yellow-600 text-white"
        : complaint.status === "Assigned"
        ? "bg-blue-600 text-white"
        : complaint.status === "Escalated"
        ? "bg-red-600 text-white"
        : complaint.status === "Resolved"
        ? "bg-green-600 text-white"
        : "bg-gray-600 text-white"
    }`}
  >
    {complaint.status}
  </span>
</td>

        <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
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

        <td className="px-6 py-4 text-gray-300">
          {complaint.assignedOfficer?.name || "Not Assigned"}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {new Date(complaint.createdAt).toLocaleString()}
        </td>

        <td className="px-6 py-4 flex gap-2">
          <button
      onClick={() => {
    setSelectedComplaint(complaint);
    setShowViewModal(true);
  }}
  className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg text-white"
>
  View
</button>

          <button
  onClick={() => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
  }}
  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-white"
>
  Assign
</button>

  <button
  disabled={
    complaint.status === "Escalated" ||
    complaint.status === "Resolved"
  }
  onClick={() => {
    setSelectedComplaint(complaint);
    setShowEscalateModal(true);
  }}
  className={`px-3 py-2 rounded-lg text-white transition ${
    complaint.status === "Escalated"
      ? "bg-orange-600 cursor-not-allowed"
      : complaint.status === "Resolved"
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}
>
  {complaint.status === "Escalated"
    ? "Escalated"
    : complaint.status === "Resolved"
    ? "Resolved"
    : "Escalate"}
</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="9"
        className="text-center py-10 text-gray-400"
      >
        No complaints found.
      </td>
    </tr>
  )}
</tbody>
          </table>

        </div>

      </div>
<AssignOfficerModal
  show={showAssignModal}
  onClose={() => setShowAssignModal(false)}
  complaint={selectedComplaint}
  fetchComplaints={fetchComplaints}
/>

<ViewComplaintModal
    show={showViewModal}
    onClose={() => setShowViewModal(false)}
    complaint={selectedComplaint}
/>

<EscalateModal
  show={showEscalateModal}
  onClose={() => setShowEscalateModal(false)}
  complaint={selectedComplaint}
  fetchComplaints={fetchComplaints}
/>
    </div>
    
  );
}

export default AllComplaints;

