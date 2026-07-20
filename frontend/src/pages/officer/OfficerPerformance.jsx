import { useEffect, useState } from "react";
import api from "../../services/api";

function OfficerPerformance() {
  const [officer, setOfficer] = useState(null);
  const [dashboard, setDashboard] = useState({
    assignedComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    escalatedComplaints: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const [userRes, dashboardRes, complaintsRes] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/officer/dashboard"),
            api.get("/officer/complaints"),
          ]);

        setOfficer(userRes.data.user);

        if (dashboardRes.data.success) {
          setDashboard(dashboardRes.data.dashboard || {});
        }

        if (complaintsRes.data.success) {
          setComplaints(complaintsRes.data.complaints || []);
        }
      } catch (error) {
        console.error("Failed to load officer performance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  const assigned = dashboard.assignedComplaints || 0;
  const resolved = dashboard.resolvedComplaints || 0;
  const pending = (dashboard.pendingComplaints || 0) + (dashboard.inProgressComplaints || 0);
  const escalated = dashboard.escalatedComplaints || 0;

  const efficiency = assigned > 0
    ? Math.round((resolved / assigned) * 100)
    : 0;

  const activeComplaints = complaints.filter(
    (complaint) => complaint.status !== "Resolved"
  ).length;

  const highPriorityComplaints = complaints.filter(
    (complaint) =>
      complaint.priority === "High" || complaint.priority === "Critical"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved" && complaint.resolvedAt
  );

  const avgResolutionDays = resolvedComplaints.length > 0
    ? (
        resolvedComplaints.reduce((total, complaint) => {
          const createdAt = new Date(complaint.createdAt).getTime();
          const resolvedAt = new Date(complaint.resolvedAt).getTime();
          return total + (resolvedAt - createdAt) / (1000 * 60 * 60 * 24);
        }, 0) / resolvedComplaints.length
      ).toFixed(1)
    : "0.0";

  const priorityBreakdown = ["Critical", "High", "Medium", "Low"].map(
    (priority) => ({
      priority,
      total: complaints.filter(
        (complaint) => complaint.priority === priority
      ).length,
    })
  );

  const monthlyMap = complaints.reduce((acc, complaint) => {
    const key = new Date(complaint.createdAt).toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    });

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const monthlyPerformance = Object.entries(monthlyMap)
    .map(([label, total]) => ({ label, total }))
    .slice(-6);

  const maxMonthTotal = monthlyPerformance.length > 0
    ? Math.max(...monthlyPerformance.map((item) => item.total))
    : 0;

  const performanceRows = [
    {
      label: "Assigned",
      total: assigned,
      color: "text-cyan-400",
    },
    {
      label: "Resolved",
      total: resolved,
      color: "text-green-400",
    },
    {
      label: "Pending",
      total: pending,
      color: "text-yellow-400",
    },
    {
      label: "Escalated",
      total: escalated,
      color: "text-red-400",
    },
  ];

  const recentCompleted = resolvedComplaints
    .sort(
      (a, b) =>
        new Date(b.resolvedAt).getTime() - new Date(a.resolvedAt).getTime()
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xl">
        Loading performance...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Officer Performance
        </h1>

        <p className="text-gray-400 mt-2">
          Live performance overview for {officer?.name || "officer"} in {officer?.department || "your department"}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Assigned
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {assigned}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Active Complaints
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {activeComplaints}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Efficiency
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">
            {efficiency}%
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            High Priority
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {highPriorityComplaints}
          </h2>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-700 to-blue-700 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold">
          Performance Snapshot
        </h2>

        <p className="mt-3 text-lg">
          {officer?.name || "Officer"} ({officer?.employeeId || "N/A"})
        </p>

        <p className="text-cyan-100">
          Resolution Rate: {efficiency}% | Average Resolution Time: {avgResolutionDays} days
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">
            Performance Breakdown
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-6 py-4">
                  Employee ID
                </th>
                <th className="text-left px-6 py-4">
                  Officer Name
                </th>
                <th className="text-left px-6 py-4">
                  Department
                </th>
                <th className="text-left px-6 py-4">
                  Metric
                </th>
                <th className="text-left px-6 py-4">
                  Total
                </th>
                <th className="text-left px-6 py-4">
                  Efficiency
                </th>
              </tr>
            </thead>

            <tbody>
              {performanceRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 font-semibold">
                    {officer?.employeeId || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {officer?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {officer?.department || "-"}
                  </td>
                  <td className={`px-6 py-4 ${row.color}`}>
                    {row.label}
                  </td>
                  <td className="px-6 py-4">
                    {row.total}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                      {efficiency}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Monthly Performance Overview
          </h2>

          <div className="space-y-5">
            {monthlyPerformance.length > 0 ? (
              monthlyPerformance.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span>{item.label}</span>
                    <span>{item.total}</span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full">
                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${
                          maxMonthTotal > 0
                            ? (item.total / maxMonthTotal) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">
                No monthly performance data available yet.
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">
            Priority Mix
          </h2>

          <div className="space-y-5">
            {priorityBreakdown.map((item) => (
              <div key={item.priority}>
                <div className="flex justify-between mb-2">
                  <span>{item.priority}</span>
                  <span>{item.total}</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div
                    className={`h-3 rounded-full ${
                      item.priority === "Critical"
                        ? "bg-red-500"
                        : item.priority === "High"
                        ? "bg-orange-500"
                        : item.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${
                        assigned > 0 ? (item.total / assigned) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">
          Recently Resolved Complaints
        </h2>

        <div className="space-y-4">
          {recentCompleted.length > 0 ? (
            recentCompleted.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-slate-800 p-4 rounded-xl flex items-center justify-between gap-4"
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
            <div className="bg-slate-800 p-4 rounded-xl text-slate-400">
              No resolved complaints available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfficerPerformance;
