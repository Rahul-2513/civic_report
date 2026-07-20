
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const ratingColors = {
  5: "bg-green-500",
  4: "bg-cyan-500",
  3: "bg-yellow-500",
  2: "bg-orange-500",
  1: "bg-red-500",
};

function CitizenFeedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [summary, setSummary] = useState({
    totalFeedback: 0,
    averageRating: 0,
    positivePercentage: 0,
    improvementPercentage: 0,
    ratingBreakdown: [],
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/feedback/officer/me");

        setFeedbacks(res.data.feedbacks || []);
        setSummary(
          res.data.summary || {
            totalFeedback: 0,
            averageRating: 0,
            positivePercentage: 0,
            improvementPercentage: 0,
            ratingBreakdown: [],
          }
        );
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Failed to load citizen feedback."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Citizen Feedback
        </h1>

        <p className="mt-2 text-gray-400">
          Review citizen satisfaction and service quality
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
          {error}
        </div>
      )}

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-gray-400">
            Total Feedback
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {summary.totalFeedback}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-gray-400">
            Average Rating
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-400">
            {summary.averageRating} ⭐
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-gray-400">
            Positive Feedback
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-400">
            {summary.positivePercentage}%
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-gray-400">
            Improvement Needed
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-400">
            {summary.improvementPercentage}%
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-gray-400">
            Loading feedback...
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-gray-400">
            No citizen feedback has been submitted for your resolved complaints yet.
          </div>
        ) : (
          feedbacks.map((item) => (
            <div
              key={`${item.id}-${item.date}`}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex flex-col justify-between gap-6 lg:flex-row">
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-xl font-bold">
                      {item.id}
                    </h2>

                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                      {"⭐".repeat(item.rating)}
                    </span>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-cyan-300">
                      {item.satisfaction}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-400">
                    Complaint: {item.complaintTitle}
                  </p>

                  <p className="text-gray-400">
                    Citizen: {item.citizen}
                  </p>

                  <p className="text-gray-400">
                    Department: {item.department}
                  </p>

                  <p className="text-gray-400">
                    Category: {item.category}
                  </p>

                  <p className="text-gray-400">
                    Date:{" "}
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-800 p-4">
                    <p className="text-gray-300">
                      "{item.comment}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:items-end">
                  <div className="text-sm text-gray-400">
                    Resolved: {item.issueResolved ? "Yes" : "No"}
                  </div>

                  <div className="text-sm text-gray-400">
                    Recommend Service: {item.recommendService ? "Yes" : "No"}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      item.complaintId &&
                      navigate(`/officer/complaint/${item.complaintId}`)
                    }
                    disabled={!item.complaintId}
                    className="rounded-xl bg-cyan-600 px-5 py-3 disabled:cursor-not-allowed disabled:bg-slate-700"
                  >
                    View Complaint
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 rounded-2xl bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Rating Breakdown
        </h2>

        <div className="space-y-4">
          {summary.ratingBreakdown.map((item) => (
            <div key={item.rating}>
              <div className="flex justify-between">
                <span>{"⭐".repeat(item.rating)}</span>
                <span>
                  {item.percentage}% ({item.count})
                </span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-slate-800">
                <div
                  className={`h-3 rounded-full ${ratingColors[item.rating]}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CitizenFeedback;

