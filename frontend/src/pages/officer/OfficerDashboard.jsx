import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";


function OfficerDashboard() {

const [stats, setStats] = useState({});
const [complaints, setComplaints] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();
const [officer, setOfficer] = useState({});



const fetchDashboard = async () => {
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
     setOfficer(dashboardRes.data.officer || {});
    setStats(dashboardRes.data.dashboard);
    setComplaints(complaintsRes.data.complaints);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDashboard();
}, []);

if (loading) {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-950 text-white text-2xl">
      Loading Dashboard...
    </div>
  );
}

  const department = officer.department || "";
  const post = officer.post || "";
  const employeeId = officer.employeeId || "";

  const isSeniorOfficer = [
    "Chief Health Inspector",
    "Divisional Officer",
    "Zonal Head",
    "Chief Sanitary Inspector",
    "Ward Officer",
    "Municipal Commissioner",
    "Mukhiya / Sarpanch",
    "BDO",
    "District Officer",
  ].includes(post);

  return (
    <div className="flex">

     

      {/* Main Content */}
     {/* Main Content */}
<div className="flex-1 min-h-screen bg-slate-950 text-white">

  {/* Header */}
 
 <div className="border-b border-slate-800 px-8 py-5 flex justify-between items-center">

  <div>
    <h1 className="text-3xl font-bold">
      Officer Dashboard
    </h1>

    <p className="text-gray-400 mt-1">
      {department} Department
    </p>
  </div>

  <div className="text-right">

    <h3 className="font-bold text-lg">
      {officer.name}
    </h3>

    <p className="font-semibold">
      {post}
    </p>

    <p className="text-sm text-gray-400">
      Employee ID: {employeeId}
    </p>

  </div>

</div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-8">

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">
              Total Complaints
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.assignedComplaints || 0}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">
              Pending
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-3">
              {stats.pendingComplaints || 0}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">
              Resolved
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {stats.resolvedComplaints || 0}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-gray-400">
              Escalated
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">
              {stats.escalatedComplaints || 0}
            </h2>
          </div>

        </div>

        {/* Quick Actions */}
         <div className="flex flex-wrap gap-4">

  <button
  onClick={() => navigate("/officer/complaints")}
  className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl"
>
  Assigned Complaints ({stats.assignedComplaints || 0})
</button>

  <button
    onClick={() => navigate("/officer/escalation")}
    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition"
  >
    Escalation ({stats.escalatedComplaints || 0})
  </button>

  <button
    onClick={() => navigate("/officer/notifications")}
    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl transition"
  >
    Notifications
  </button>

</div>

        {/* Escalation Requests */}
        {isSeniorOfficer && (

          <div className="px-8 mt-8">

            <div className="bg-slate-900 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-4">
                Escalation Requests
              </h2>

              <div className="space-y-4">

                <div className="bg-slate-800 p-4 rounded-xl">
                  Complaint #CMP1023 requires approval.
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  Complaint #CMP1051 escalated from lower officer.
                </div>

              </div>

            </div>

          </div>

        )}

        {/* Assigned Complaints */}
        <div className="px-8 py-8">

          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Assigned Complaints
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="text-left py-3">
                    Complaint ID
                  </th>

                  <th className="text-left py-3">
                    Issue
                  </th>

                  <th className="text-left py-3">
                    Area
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>

                  <th className="text-left py-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>
  {complaints.length > 0 ? (
    complaints.slice(0, 5).map((item) => (
      <tr
        key={item._id}
        className="border-b border-slate-800"
      >
        <td className="py-4">
          {item._id.slice(-8).toUpperCase()}
        </td>

        <td>
          {item.title}
        </td>

        <td>
          {item.location?.address}
        </td>

        <td>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.status === "Resolved"
                ? "bg-green-500/20 text-green-400"
                : item.status === "Assigned"
                ? "bg-yellow-500/20 text-yellow-400"
                : item.status === "Escalated"
                ? "bg-red-500/20 text-red-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {item.status}
          </span>
        </td>

        <td>
          <button
            type="button"
            onClick={() => navigate(`/officer/complaint/${item._id}`)}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
          >
            View
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="5"
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

    </div>
  );
}

export default OfficerDashboard;

