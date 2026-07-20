import { useEffect, useState } from "react";
import api from "../../services/api";

function ReportsAnalytics() {
  const [dashboard, setDashboard] = useState({
    assignedComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    escalatedComplaints: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [officer, setOfficer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [dashboardRes, complaintsRes] = await Promise.all([
          api.get("/officer/dashboard"),
          api.get("/officer/complaints"),
        ]);

        if (dashboardRes.data.success) {
          setDashboard(dashboardRes.data.dashboard || {});
          setOfficer(dashboardRes.data.officer || {});
        }

        if (complaintsRes.data.success) {
          setComplaints(complaintsRes.data.complaints || []);
        }
      } catch (error) {
        console.error("Failed to load reports analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const resolutionRate =
    dashboard.assignedComplaints > 0
      ? Math.round(
          (dashboard.resolvedComplaints /
            dashboard.assignedComplaints) *
            100
        )
      : 0;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved" && complaint.resolvedAt
  );

  const averageResolutionTime =
    resolvedComplaints.length > 0
      ? (
          resolvedComplaints.reduce((total, complaint) => {
            const createdAt = new Date(complaint.createdAt).getTime();
            const resolvedAt = new Date(complaint.resolvedAt).getTime();
            return total + (resolvedAt - createdAt) / (1000 * 60 * 60 * 24);
          }, 0) / resolvedComplaints.length
        ).toFixed(1)
      : "0.0";

  const monthlyTrendMap = complaints.reduce((acc, complaint) => {
    const date = new Date(complaint.createdAt);
    const key = date.toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    });

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const monthlyTrend = Object.entries(monthlyTrendMap)
    .map(([month, total]) => ({
      month,
      total,
    }))
    .slice(-6);

  const maxMonthlyTotal =
    monthlyTrend.length > 0
      ? Math.max(...monthlyTrend.map((item) => item.total))
      : 0;

  const categoryMap = complaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {});

  const categoryStats = Object.entries(categoryMap)
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  const statusRows = [
    {
      label: "Assigned",
      total: complaints.filter((item) => item.status === "Assigned").length,
      color: "text-blue-400",
    },
    {
      label: "In Progress",
      total: dashboard.inProgressComplaints || 0,
      color: "text-cyan-400",
    },
    {
      label: "Resolved",
      total: dashboard.resolvedComplaints || 0,
      color: "text-green-400",
    },
    {
      label: "Escalated",
      total: dashboard.escalatedComplaints || 0,
      color: "text-red-400",
    },
  ];

  const recentResolved = resolvedComplaints
    .sort(
      (a, b) =>
        new Date(b.resolvedAt).getTime() - new Date(a.resolvedAt).getTime()
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xl">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Live analytics for {officer.department || "your"} department complaints handled by you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Complaints
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {dashboard.assignedComplaints || 0}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Resolved
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            {dashboard.resolvedComplaints || 0}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Pending + In Progress
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            {(dashboard.pendingComplaints || 0) +
              (dashboard.inProgressComplaints || 0)}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Escalated
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-3">
            {dashboard.escalatedComplaints || 0}
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Monthly Complaint Trend
          </h2>

          <div className="space-y-4">
            {monthlyTrend.length > 0 ? (
              monthlyTrend.map((item) => (
                <div key={item.month}>
                  <div className="flex justify-between mb-1">
                    <span>{item.month}</span>
                    <span>{item.total}</span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full">
                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${
                          maxMonthlyTotal > 0
                            ? (item.total / maxMonthlyTotal) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">
                No complaint trend available yet.
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Resolution Performance
          </h2>

          <div className="flex flex-col gap-6">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-gray-400">
                Resolution Rate
              </p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                {resolutionRate}%
              </h3>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-gray-400">
                Average Resolution Time
              </p>

              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                {averageResolutionTime} Days
              </h3>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-gray-400">
                Current Department
              </p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {officer.department || "-"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Status Breakdown
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Status
              </th>
              <th className="text-left py-3">
                Total
              </th>
              <th className="text-left py-3">
                Department
              </th>
              <th className="text-left py-3">
                Officer
              </th>
            </tr>
          </thead>

          <tbody>
            {statusRows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-slate-800 last:border-b-0"
              >
                <td className={`py-4 ${row.color}`}>
                  {row.label}
                </td>
                <td>{row.total}</td>
                <td>{officer.department || "-"}</td>
                <td>{officer.name || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {categoryStats.length > 0 ? (
          categoryStats.map((item, index) => {
            const colors = [
              "text-cyan-400",
              "text-blue-400",
              "text-yellow-400",
            ];

            return (
              <div
                key={item.category}
                className="bg-slate-900 rounded-2xl p-6"
              >
                <h3 className="font-bold text-lg">
                  {item.category}
                </h3>

                <p
                  className={`text-4xl font-bold mt-4 ${
                    colors[index % colors.length]
                  }`}
                >
                  {item.total}
                </p>
              </div>
            );
          })
        ) : (
          <div className="bg-slate-900 rounded-2xl p-6 md:col-span-3 text-gray-400">
            No complaint categories available yet.
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Recently Resolved Complaints
        </h2>

        <div className="space-y-4">
          {recentResolved.length > 0 ? (
            recentResolved.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold">
                    {complaint.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {complaint.location?.address || "Location not available"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-400 font-semibold">
                    Resolved
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(complaint.resolvedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">
              No resolved complaints available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
