import { useState, useEffect } from "react";
import axios from "axios";


function AuditLogs() {

   const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

   const fetchAuditLogs = async () => {
    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/audit-logs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLogs(res.data.logs);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  

  useEffect(() => {
    fetchAuditLogs();
  }, []);


  const exportLogs = () => {
  if (logs.length === 0) {
    alert("No audit logs available to export.");
    return;
  }

  const headers = [
    "User",
    "Role",
    "Module",
    "Action",
    "Description",
    "Method",
    "Date & Time",
  ];

  const rows = logs.map((log) => [
    log.user?.name || "-",
    log.role || "-",
    log.module || "-",
    log.action || "-",
    log.description || "-",
    log.method || "-",
    log.createdAt
      ? new Date(log.createdAt).toLocaleString()
      : "-",
  ]);

  const escapeCSV = (value) => {
    const stringValue = String(value ?? "");
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) =>
      row.map(escapeCSV).join(",")
    ),
  ].join("\n");

  const blob = new Blob(
    ["\uFEFF" + csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.setAttribute(
    "download",
    `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};


  const successfulActions = logs.filter(
  (log) =>
    log.status === "success" ||
    log.status === "SUCCESS"
).length;

const updates = logs.filter(
  (log) =>
    log.action?.toLowerCase().includes("update") ||
    log.method?.toUpperCase() === "PUT" ||
    log.method?.toUpperCase() === "PATCH"
).length;

const escalations = logs.filter(
  (log) =>
    log.action?.toLowerCase().includes("escalat") ||
    log.module?.toLowerCase().includes("escalat")
).length;

  

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Audit Logs
          </h1>

          <p className="text-gray-400 mt-2">
            Track all system activities and administrative actions.
          </p>

        </div>

<button
  onClick={exportLogs}
  disabled={loading || logs.length === 0}
  className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-5 py-3 rounded-xl text-white font-semibold"
>
  Export Logs
</button>


      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Logs
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
             {logs.length}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Successful Actions
          </p>

         <h2 className="text-4xl font-bold text-white mt-3">
          {successfulActions}
         </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-yellow-400">
            Updates
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {updates}
           </h2> 

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-red-400">
            Escalations
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
         {escalations}
          </h2>

        </div>

      </div>

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Recent Activity Logs
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">
  <tr>
    <th className="text-left px-6 py-4 text-gray-300">User</th>
    <th className="text-left px-6 py-4 text-gray-300">Role</th>
    <th className="text-left px-6 py-4 text-gray-300">Module</th>
    <th className="text-left px-6 py-4 text-gray-300">Action</th>
    <th className="text-left px-6 py-4 text-gray-300">Description</th>
    <th className="text-left px-6 py-4 text-gray-300">Method</th>
    <th className="text-left px-6 py-4 text-gray-300">Date & Time</th>
  </tr>
</thead>

           <tbody>

{loading ? (

<tr>
<td
colSpan="7"
className="text-center py-8 text-white"
>
Loading...
</td>
</tr>

) : logs.length === 0 ? (

<tr>
<td
colSpan="7"
className="text-center py-8 text-gray-400"
>
No Audit Logs Found
</td>
</tr>

) : (

logs.map((log) => (

<tr
key={log._id}
className="border-b border-slate-800 hover:bg-slate-800/40"
>

<td className="px-6 py-4 text-white">
{log.user?.name || "-"}
</td>

<td className="px-6 py-4 text-cyan-400">
{log.role}
</td>

<td className="px-6 py-4 text-yellow-400">
{log.module}
</td>

<td className="px-6 py-4 text-white">
{log.action}
</td>

<td className="px-6 py-4 text-gray-300">
{log.description}
</td>

<td className="px-6 py-4">
<span className="bg-purple-600 px-3 py-1 rounded-full text-white text-xs">
{log.method}
</span>
</td>

<td className="px-6 py-4 text-gray-400">
{new Date(log.createdAt).toLocaleString()}
</td>

</tr>

))

)}

</tbody>
          </table>

        </div>

      </div>

      {/* Security Notice */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          Security Notice
        </h2>

        <p className="text-gray-400">
          Audit logs help track all administrative activities, officer actions,
          complaint updates, escalations and department modifications.
          These logs are critical for transparency and accountability.
        </p>

      </div>

    </div>
  );
}

export default AuditLogs;
