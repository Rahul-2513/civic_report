import { useEffect, useState } from "react";
import axios from "axios";
import ViewComplaintModal from "./ViewComplaintModal";

function EscalationManagement() {
const [escalations, setEscalations] = useState([]);
const [loading, setLoading] = useState(true);
const [showViewModal, setShowViewModal] = useState(false);
const [selectedComplaint, setSelectedComplaint] = useState(null);
useEffect(() => {
  fetchEscalations();
}, []); 

const fetchEscalations = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/escalations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEscalations(res.data.complaints);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleReview = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/complaints/${id}/review`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchEscalations();

  } catch (error) {
    console.error(error);
  }
};

const handleResolve = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/complaints/${id}/resolve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchEscalations();

  } catch (error) {
    console.error(error);
  }
};

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
            Escalation Management
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor, review and manage escalated complaints.
          </p>

        </div>

        <button className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white font-semibold">
          High Priority Cases
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Escalations
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {escalations.length}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-red-400">
            High Priority
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {
                escalations.filter(
                 (e) => e.priority === "High"
                    ).length
                   }
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-yellow-400">
            Under Review
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {
                escalations.filter(
              (e) => e.status === "Under Review"
                    ).length
                    }
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Resolved
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {
               escalations.filter(
                (e) => e.status === "Resolved"
               ).length
                    }
          </h2>

        </div>

      </div>

      {/* Escalation Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Escalated Complaints
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
                  Reason
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Priority
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Status
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

  {escalations.length > 0 ? (

    escalations.map((item) => (

      <tr
        key={item._id}
        className="border-b border-slate-800 hover:bg-slate-800/40"
      >

        <td className="px-6 py-4 text-white">
          {`CMP-${item._id.slice(-5).toUpperCase()}`}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {item.citizen?.name}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {item.department}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {item.escalationReason}
        </td>

        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.priority === "High"
                ? "bg-red-600 text-white"
                : item.priority === "Medium"
                ? "bg-yellow-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {item.priority}
          </span>
        </td>

        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.status === "Resolved"
                ? "bg-green-600 text-white"
                : item.status === "Under Review"
                ? "bg-yellow-600 text-white"
                : item.status === "Escalated"
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {item.status}
          </span>
        </td>

        <td className="px-6 py-4 text-gray-300">
          {new Date(item.updatedAt).toLocaleString()}
        </td>

        <td className="px-6 py-4 flex gap-2">

          <button
             onClick={() => {
                setSelectedComplaint(item);
                    setShowViewModal(true);
                     }}
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg text-white"
                   >
                    View
                   </button>

          <button
              onClick={() => handleReview(item._id)}
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-white"
                 >
                 Review
              </button>

                  <button
                      onClick={() => handleResolve(item._id)}
                     className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-white"
                         >
                      Resolve
               </button>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="8"
        className="text-center py-10 text-gray-400"
      >
        No Escalated Complaints Found
      </td>

    </tr>

  )}

</tbody>
            

          </table>

        </div>

      </div>

      {/* Escalation Policy */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-4">
          Escalation Policy
        </h2>

        <ul className="space-y-3 text-gray-400">

          <li>
            • Complaints pending for more than 7 days are automatically escalated.
          </li>

          <li>
            • High priority complaints receive immediate administrative review.
          </li>

          <li>
            • Escalated complaints are monitored until resolution.
          </li>

          <li>
            • Repeated unresolved complaints are forwarded to higher authorities.
          </li>

        </ul>

      </div>
      <ViewComplaintModal
         show={showViewModal}
         onClose={() => setShowViewModal(false)}
           complaint={selectedComplaint}
/>

    </div>
  );
}

export default EscalationManagement;
