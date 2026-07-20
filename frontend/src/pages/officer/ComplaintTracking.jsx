
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function ComplaintTracking() {
  const [search, setSearch] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeActionId, setActiveActionId] = useState("");

  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/officer/tracking");

      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load complaint tracking data."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEscalate = async (id) => {
    try {
      setActiveActionId(`escalate-${id}`);

      await api.put(`/officer/complaints/${id}/escalate`, {
        reason: "Need higher authority approval.",
      });

      alert("Complaint escalated successfully");
      fetchComplaints();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Escalation failed");
    } finally {
      setActiveActionId("");
    }
  };

  const handleResolve = async (id) => {
    try {
      setActiveActionId(`resolve-${id}`);

      await api.put(`/officer/complaints/${id}/status`, {
        status: "Resolved",
      });

      alert("Complaint resolved successfully");
      fetchComplaints();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Resolve failed");
    } finally {
      setActiveActionId("");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading Complaint Tracking...
      </div>
    );
  }

  const filteredComplaints = complaints.filter((item) => {
    const query = search.toLowerCase();

    return (
      item._id.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.citizen?.name?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Complaint Tracking
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor complaint progress and status updates
        </p>

      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="bg-slate-900 rounded-2xl p-5 mb-8">

        <input
          type="text"
          placeholder="Search Complaint ID or Issue..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
        />

      </div>

      {/* Tracking Cards */}
      <div className="space-y-6">
        {filteredComplaints.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-gray-400">
            {complaints.length === 0
              ? "No complaints are currently assigned for tracking."
              : "No complaints matched your search."}
          </div>
        ) : (
          filteredComplaints.map((item) => {
            const isResolved = item.status === "Resolved";
            const isEscalated = item.status === "Escalated";
            const canResolve = !isResolved && !isEscalated;
            const canEscalate = !isResolved && !isEscalated;
            const submittedAt = new Date(item.createdAt);
            const statusUpdatedAt = new Date(
              item.resolvedAt || item.updatedAt
            );

            return (

          <div
           key={item._id}
            className="bg-slate-900 rounded-2xl p-6"
          >

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <h2 className="text-2xl font-bold">
                  {item._id.slice(-8).toUpperCase()}
                </h2>

                <p className="text-gray-400 mt-1">
                  {item.title}
                </p>

                <p className="text-gray-400 mt-2">
                  Citizen: {item.citizen?.name}
                </p>

                <p className="text-gray-400">
                  Location: {item.location?.address}
                </p>

              </div>

              <div className="flex gap-3 flex-wrap">

<span
  className={`px-4 py-2 rounded-xl ${
    item.priority === "High"
      ? "bg-red-500/20 text-red-400"
      : item.priority === "Medium"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-green-500/20 text-green-400"
  }`}
>
  Priority: {item.priority}
</span>

 <span
  className={`px-4 py-2 rounded-xl ${
    item.status === "Resolved"
      ? "bg-green-500/20 text-green-400"
      : item.status === "Assigned"
      ? "bg-yellow-500/20 text-yellow-400"
      : item.status === "Escalated"
      ? "bg-red-500/20 text-red-400"
      : "bg-blue-500/20 text-blue-400"
  }`}
>
  Status: {item.status}
</span>

              </div>

            </div>

            {/* Timeline */}
            <div className="mt-8">

              <h3 className="text-lg font-bold mb-4">
                Complaint Timeline
              </h3>

              <div className="flex flex-col gap-4">

                <div className="flex gap-4">

                  <div className="w-4 h-4 bg-green-500 rounded-full mt-2"></div>

                  <div>

                    <h4 className="font-semibold">
                      Complaint Submitted
                    </h4>

                    <p className="text-gray-400">
                     {new Date(item.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="w-4 h-4 bg-yellow-500 rounded-full mt-2"></div>

                  <div>

                    <h4 className="font-semibold">
                      Assigned To Officer
                    </h4>

                    <p className="text-gray-400">
                         {submittedAt.toLocaleString("en-IN")}
                       </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="w-4 h-4 bg-cyan-500 rounded-full mt-2"></div>

                  <div>

                    <h4 className="font-semibold">
                      Current Status
                    </h4>

                    <p className="text-gray-400">
                      {item.status}{" "}
                      on {statusUpdatedAt.toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8 flex-wrap">

<button
  onClick={() => navigate(`/officer/complaint/${item._id}`)}
  className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl"
>
  View Details
</button>

 <button
  onClick={() => handleResolve(item._id)}
  disabled={!canResolve || activeActionId === `resolve-${item._id}`}
  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl disabled:cursor-not-allowed disabled:bg-slate-700"
>
  {activeActionId === `resolve-${item._id}`
    ? "Resolving..."
    : "Mark Resolved"}
</button>

<button
  onClick={() => handleEscalate(item._id)}
  disabled={!canEscalate || activeActionId === `escalate-${item._id}`}
  className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl disabled:cursor-not-allowed disabled:bg-slate-700"
>
  {activeActionId === `escalate-${item._id}`
    ? "Escalating..."
    : "Escalate"}
</button>

            </div>

          </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default ComplaintTracking;


