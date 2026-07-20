import { useEffect, useState } from "react";
import api from "../../services/api";

function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [summary, setSummary] = useState({
    totalFeedback: 0,
    averageRating: 0,
    positivePercentage: 0,
    negativePercentage: 0,
  });
  const [insights, setInsights] = useState({
    topDepartment: null,
    needsAttentionDepartment: null,
    topOfficer: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/feedback/admin/all");

        setFeedbacks(res.data.feedbacks || []);
        setSummary(
          res.data.summary || {
            totalFeedback: 0,
            averageRating: 0,
            positivePercentage: 0,
            negativePercentage: 0,
          }
        );
        setInsights(
          res.data.insights || {
            topDepartment: null,
            needsAttentionDepartment: null,
            topOfficer: null,
          }
        );
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Failed to load feedback records."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleExport = () => {
    if (!feedbacks.length) {
      return;
    }

    const rows = [
      [
        "Complaint ID",
        "Complaint Title",
        "Citizen",
        "Officer",
        "Officer ID",
        "Department",
        "Category",
        "Rating",
        "Satisfaction",
        "Feedback",
        "Status",
        "Date",
      ],
      ...feedbacks.map((item) => [
        item.id,
        item.complaintTitle,
        item.citizen,
        item.officer,
        item.officerId,
        item.department,
        item.category,
        item.rating,
        item.satisfaction,
        item.comment,
        item.status,
        new Date(item.date).toLocaleString("en-IN"),
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `feedback-report-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Feedback Management
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor citizen satisfaction and officer performance.
          </p>

        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={!feedbacks.length}
          className="mt-4 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-700 md:mt-0"
        >
          Export Feedback Report
        </button>

      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Feedback
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {summary.totalFeedback}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-yellow-400">
            Average Rating
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {summary.averageRating} ⭐
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Positive Feedback
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {summary.positivePercentage}%
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-red-400">
            Negative Feedback
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {summary.negativePercentage}%
          </h2>

        </div>

      </div>

      {/* Feedback Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Citizen Feedback Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4 text-gray-300">
                  Citizen
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Officer
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Rating
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Feedback
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Loading feedback records...
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No feedback records found.
                  </td>
                </tr>
              ) : (
                feedbacks.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="px-6 py-4 text-white">
                    {item.citizen}
                  </td>

                  <td className="px-6 py-4 text-white">
                    {item.officer}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item.department}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.rating >= 4
                          ? "bg-green-600"
                          : item.rating === 3
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.rating} ⭐
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item.comment}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Insights */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Feedback Insights
        </h2>

        <div className="space-y-4 text-gray-300">

          <p>
            {summary.positivePercentage >= 50
              ? `Most citizens are satisfied with complaint resolution (${summary.positivePercentage}% positive feedback).`
              : "Citizen satisfaction is currently below the healthy range and needs attention."}
          </p>

          <p>
            {insights.topDepartment
              ? `${insights.topDepartment.department} has the highest average rating (${insights.topDepartment.averageRating} stars).`
              : "Department-wise rating insight will appear once feedback data is available."}
          </p>

          <p>
            {insights.needsAttentionDepartment
              ? `${insights.needsAttentionDepartment.department} needs the most attention right now based on lower-rated feedback.`
              : "Low-rating trend insight will appear once feedback data is available."}
          </p>

          <p>
            {insights.topOfficer
              ? `${insights.topOfficer.officer} is currently the highest-rated officer with an average of ${insights.topOfficer.averageRating} stars.`
              : "Top officer insight will appear once feedback data is available."}
          </p>

        </div>

      </div>

    </div>
  );
}

export default FeedbackManagement;
