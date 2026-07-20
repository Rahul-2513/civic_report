import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function EscalationRequests() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEscalatedComplaints();
  }, []);

  const fetchEscalatedComplaints = async () => {
    try {
      const res = await api.get("/officer/escalated");
      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartReview = async (id) => {
    try {
      await api.put(`/officer/complaints/${id}/status`, {
        status: "In Progress",
      });

      alert("Complaint moved to In Progress.");
      fetchEscalatedComplaints();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to start review."
      );
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.put(`/officer/complaints/${id}/status`, {
        status: "Resolved",
      });

      alert("Complaint resolved successfully.");
      fetchEscalatedComplaints();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to resolve complaint."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (!loading && complaints.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-gray-400">
        No Escalated Complaints Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Escalation Requests
          </h1>

          <p className="text-gray-400 mt-2">
            Complaints transferred to you by junior officers for senior review.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Requests
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {complaints.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            High Priority
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            {complaints.filter((c) => c.priority === "High").length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Pending Review
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {complaints.filter((c) => c.status === "Escalated").length}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {complaints.map((item) => {
          const latestEscalation =
            item.escalationHistory?.[item.escalationHistory.length - 1];

          return (
            <div
              key={item._id}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex gap-3 items-center flex-wrap">
                    <h2 className="text-xl font-bold">
                      {item._id.slice(-6).toUpperCase()}
                    </h2>

                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      {item.priority}
                    </span>

                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg mt-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    📍 {item.location?.address || "Location not available"}
                  </p>

                  <p className="text-gray-400 mt-1">
                    Citizen: {item.citizen?.name || "Unknown"}
                  </p>

                  <p className="text-gray-400 mt-1">
                    Escalated From:{" "}
                    {latestEscalation?.fromOfficer
                      ? `${latestEscalation.fromOfficer.name} (${latestEscalation.fromOfficer.post})`
                      : "Officer"}
                  </p>

                  <p className="text-gray-400 mt-1">
                    Transferred To:{" "}
                    {latestEscalation?.toOfficer
                      ? `${latestEscalation.toOfficer.name} (${latestEscalation.toOfficer.post})`
                      : item.assignedOfficer?.name || "Current officer"}
                  </p>

                  <p className="text-gray-400 mt-1">
                    Escalated On:{" "}
                    {latestEscalation?.escalatedAt
                      ? new Date(
                          latestEscalation.escalatedAt
                        ).toLocaleString("en-IN")
                      : new Date(item.updatedAt).toLocaleString("en-IN")}
                  </p>

                  <div className="mt-4 bg-slate-800 p-4 rounded-xl">
                    <p className="text-sm text-gray-300">
                      <strong>Reason:</strong>{" "}
                      {latestEscalation?.reason ||
                        item.escalationReason ||
                        "No reason provided"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[220px]">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/officer/complaint/${item._id}`)
                    }
                    className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl"
                  >
                    View Complaint
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartReview(item._id)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-xl"
                  >
                    Start Review
                  </button>

                  <button
                    type="button"
                    onClick={() => handleResolve(item._id)}
                    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
                  >
                    Resolve Complaint
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EscalationRequests;
