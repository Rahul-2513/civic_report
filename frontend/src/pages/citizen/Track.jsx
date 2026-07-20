import { useState } from "react";
import api from "../../services/api";

const statusStyles = {
  Pending: "bg-yellow-600 text-white",
  Assigned: "bg-blue-600 text-white",
  "In Progress": "bg-cyan-600 text-white",
  Resolved: "bg-green-600 text-white",
  Rejected: "bg-red-600 text-white",
  Escalated: "bg-purple-600 text-white",
};

const timelineSteps = [
  { key: "submitted", label: "Submitted" },
  { key: "assigned", label: "Assigned" },
  { key: "progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
];

function getTimelineState(status) {
  switch (status) {
    case "Pending":
      return 0;
    case "Assigned":
    case "Escalated":
      return 1;
    case "In Progress":
      return 2;
    case "Resolved":
      return 3;
    case "Rejected":
      return 0;
    default:
      return 0;
  }
}

function getEstimate(complaint) {
  if (complaint.status === "Resolved" && complaint.resolvedAt) {
    return `Resolved on ${new Date(
      complaint.resolvedAt
    ).toLocaleDateString("en-IN")}`;
  }

  if (complaint.status === "Rejected") {
    return "Resolution closed";
  }

  if (complaint.priority === "Critical") {
    return "Within 24 hours";
  }

  if (complaint.priority === "High") {
    return "Within 2 days";
  }

  if (complaint.priority === "Medium") {
    return "Within 3 to 5 days";
  }

  return "Within 5 to 7 days";
}

function buildActivity(complaint) {
  const items = [
    {
      title: "Complaint Submitted",
      description: "Your complaint was registered successfully.",
      timestamp: complaint.createdAt,
      icon: "📝",
      accent: "bg-green-100 text-green-600",
    },
  ];

  if (complaint.assignedOfficer) {
    items.push({
      title: "Officer Assigned",
      description: `${complaint.assignedOfficer.name} is handling this complaint.`,
      timestamp: complaint.updatedAt,
      icon: "👤",
      accent: "bg-blue-100 text-blue-600",
    });
  }

  complaint.escalationHistory?.forEach((entry) => {
    items.push({
      title: "Complaint Escalated",
      description:
        entry.reason || "Complaint escalated to the next level.",
      timestamp: entry.escalatedAt,
      icon: "🚨",
      accent: "bg-purple-100 text-purple-600",
    });
  });

  complaint.remarks?.forEach((remark) => {
    items.push({
      title: "Officer Update",
      description: remark.message,
      timestamp: remark.createdAt,
      icon: "💬",
      accent: "bg-cyan-100 text-cyan-600",
    });
  });

  if (complaint.resolvedAt) {
    items.push({
      title: "Complaint Resolved",
      description: "This complaint has been marked as resolved.",
      timestamp: complaint.resolvedAt,
      icon: "✔",
      accent: "bg-green-100 text-green-600",
    });
  }

  return items.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}

function Track() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!complaintId.trim()) {
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/complaints/${complaintId.trim()}`);

      if (res.data.success) {
        setComplaint(res.data.complaint);
      }
    } catch (err) {
      console.log(err);
      setComplaint(null);
      alert("Complaint not found");
    } finally {
      setLoading(false);
    }
  };

  const timelineState = complaint
    ? getTimelineState(complaint.status)
    : 0;
  const latestRemark = complaint?.remarks?.length
    ? complaint.remarks[complaint.remarks.length - 1]
    : null;
  const activityItems = complaint ? buildActivity(complaint) : [];

  return (
    <div className="p-2">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Track Complaint 📍
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          Track your complaint status and real-time progress.
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mt-10">
        <h2 className="text-2xl font-bold text-white">
          Enter Complaint ID
        </h2>

        <p className="text-gray-400 mt-2">
          Example: 6a5099dba074460cafd2f8a3
        </p>

        <div className="flex gap-4 mt-6">
          <input
            type="text"
            placeholder="Enter Complaint ID"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            className="flex-1 border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            onClick={handleTrack}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 text-white px-8 py-4 rounded-2xl font-semibold transition"
          >
            {loading ? "Tracking..." : "Track Now"}
          </button>
        </div>
      </div>

      {complaint && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Complaint Details
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Complete complaint tracking information
                  </p>
                </div>

                <span
                  className={`px-5 py-3 rounded-full font-semibold ${
                    statusStyles[complaint.status] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div>
                  <p className="text-gray-400">
                    Complaint ID
                  </p>

                  <h3 className="text-xl font-semibold mt-2 text-white">
                    {complaint._id}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Department
                  </p>

                  <h3 className="text-xl font-semibold mt-2 text-white">
                    {complaint.department}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Title
                  </p>

                  <h3 className="text-xl font-semibold mt-2 text-white">
                    {complaint.title}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Category
                  </p>

                  <h3 className="text-xl font-semibold mt-2 text-white">
                    {complaint.category}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Date Submitted
                  </p>

                  <h3 className="text-xl font-semibold mt-2 text-white">
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString("en-IN")}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Priority
                  </p>

                  <span className="inline-block mt-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium">
                    {complaint.priority}
                  </span>
                </div>

                <div>
                  <p className="text-gray-400">
                    Location
                  </p>

                  <h3 className="text-xl font-semibold mt-2 text-white">
                    {complaint.location?.address || "Not provided"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Assigned Officer
                  </p>

                  <h3 className="text-xl font-semibold mt-2">
                    {complaint.assignedOfficer?.name || "Not assigned yet"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                Complaint Description
              </h2>

              <p className="text-gray-300 leading-relaxed text-lg">
                {complaint.description}
              </p>
            </div>

            {complaint.images?.[0] && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Uploaded Evidence
                </h2>

                <img
                  src={complaint.images[0]}
                  alt="Complaint evidence"
                  className="w-full h-[400px] object-cover rounded-3xl"
                />
              </div>
            )}

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <h2 className="text-3xl font-bold text-white mb-10">
                Complaint Progress Timeline
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {timelineSteps.map((step, index) => {
                  const completed = index < timelineState;
                  const current = index === timelineState;
                  const isRejected =
                    complaint.status === "Rejected" &&
                    step.key !== "submitted";

                  return (
                    <div
                      key={step.key}
                      className={`rounded-2xl border p-5 text-center ${
                        isRejected
                          ? "border-red-700 bg-slate-950 opacity-70"
                          : completed
                          ? "border-green-700 bg-slate-950"
                          : current
                          ? "border-cyan-700 bg-slate-950"
                          : "border-slate-700 bg-slate-950"
                      }`}
                    >
                      <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                          isRejected
                            ? "bg-red-500 text-white"
                            : completed
                            ? "bg-green-500 text-white"
                            : current
                            ? "bg-blue-600 text-white"
                            : "bg-slate-300 text-white"
                        }`}
                      >
                        {isRejected
                          ? "!"
                          : completed
                          ? "✔"
                          : current
                          ? "⏳"
                          : "○"}
                      </div>

                      <h3 className="mt-4 font-semibold text-lg text-white">
                        {step.label}
                      </h3>

                      <p className="text-gray-400 text-sm mt-1">
                        {step.key === "submitted"
                          ? "Complaint submitted"
                          : step.key === "assigned"
                          ? complaint.assignedOfficer
                            ? "Officer assigned"
                            : "Waiting assignment"
                          : step.key === "progress"
                          ? complaint.status === "In Progress"
                            ? "Work ongoing"
                            : "Awaiting work start"
                          : complaint.status === "Resolved"
                          ? "Complaint closed"
                          : "Waiting completion"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 border-l-4 border-cyan-500">
              <h2 className="text-2xl font-bold text-white mb-5">
                Officer Update 💬
              </h2>

              <p className="text-gray-300 leading-relaxed">
                {latestRemark?.message || "No officer update yet."}
              </p>

              <p className="text-sm text-gray-400 mt-5">
                {latestRemark?.createdAt
                  ? `Updated on ${new Date(
                      latestRemark.createdAt
                    ).toLocaleDateString("en-IN")}`
                  : "No updates available"}
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Estimated Resolution ⏱
              </h2>

              <div className="bg-slate-950 rounded-2xl p-6 text-center border border-slate-700">
                <h3 className="text-3xl font-bold text-cyan-400">
                  {getEstimate(complaint)}
                </h3>

                <p className="text-gray-400 mt-3">
                  Based on current priority and status
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Activity 🔔
              </h2>

              <div className="space-y-6">
                {activityItems.length > 0 ? (
                  activityItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex gap-4"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${item.accent}`}
                      >
                        {item.icon}
                      </div>

                      <div>
                          <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
                          {item.description}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(item.timestamp).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No activity available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Track;
