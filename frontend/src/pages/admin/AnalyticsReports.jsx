import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

function AnalyticsReports() {
  const [dashboard, setDashboard] = useState({});
  const [department, setDepartment] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        dashboardRes,
        departmentRes,
        monthlyRes,
        officerRes,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/dashboard", { headers }),
        axios.get(
          "http://localhost:5000/api/admin/analytics/department",
          { headers }
        ),
        axios.get(
          "http://localhost:5000/api/admin/analytics/monthly",
          { headers }
        ),
        axios.get(
          "http://localhost:5000/api/admin/analytics/officer-performance",
          { headers }
        ),
      ]);

      setDashboard(dashboardRes.data.dashboard || {});
      setDepartment(departmentRes.data.analytics || []);
      setMonthly(monthlyRes.data.analytics || []);
      setOfficers(officerRes.data.performance || []);
    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading Analytics...
      </div>
    );
  }

  const complaintData = [
  {
    name: "Pending",
    value: dashboard.pendingComplaints || 0,
  },
  {
    name: "Resolved",
    value: dashboard.resolvedComplaints || 0,
  },
  {
    name: "Escalated",
    value: dashboard.escalatedComplaints || 0,
  },
];


const departmentChart = department.map((item) => ({
  department: item._id,
  total: item.totalComplaints,
  resolved: item.resolvedComplaints,
}));

const monthlyChart = monthly.map((item) => ({
  month: `${item._id.month}/${item._id.year}`,
  complaints: item.totalComplaints,
}));

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Analytics & Reports
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor complaint trends, department performance and system
            statistics.
          </p>
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold">
          Export Report
        </button>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Complaints
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.totalComplaints || 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-yellow-400">
            Pending Cases
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.pendingComplaints || 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-green-400">
            Resolution Rate
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.resolutionRate || 0}%
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-red-400">
            Escalated Cases
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {dashboard.escalatedComplaints || 0}
          </h2>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

<div className="bg-slate-900 rounded-2xl p-6">

<h2 className="text-xl text-white mb-5">
Complaint Status
</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={complaintData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

<Cell fill="#facc15"/>
<Cell fill="#22c55e"/>
<Cell fill="#ef4444"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

<div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
border border-cyan-500/20
rounded-3xl
shadow-2xl shadow-cyan-500/10
p-6
hover:shadow-cyan-500/20
hover:border-cyan-400/40
transition-all
duration-300">

<h2 className="text-xl text-white mb-5">
Department Performance
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={departmentChart}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="department"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Bar
  dataKey="total"
  name="Total Complaints"
  fill="#3B82F6"
  radius={[8, 8, 0, 0]}
  />
<Bar
  dataKey="resolved"
  name="Resolved"
  fill="#10B981"
  radius={[8, 8, 0, 0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

      <div className="bg-slate-900 rounded-2xl p-6">

<h2 className="text-xl text-white mb-5">
Monthly Trend
</h2>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={monthlyChart}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line
type="monotone"
dataKey="complaints"
/>

</LineChart>

</ResponsiveContainer>

</div>

            {/* Monthly Report */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Monthly Complaint Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Monthly Complaint Summary
          </h2>

          <div className="space-y-4">

            {monthly.length > 0 ? (

              monthly.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between text-gray-300"
                >

                  <span>
                    {`${item._id.month}/${item._id.year}`}
                  </span>

                  <span>
                    {item.totalComplaints} Complaints
                  </span>

                </div>

              ))

            ) : (

              <p className="text-gray-400">
                No Monthly Data Available
              </p>

            )}

          </div>

        </div>

        {/* Complaint Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Complaint Status Distribution
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-green-400">
                Resolved
              </span>

              <span className="text-white">
                {dashboard.resolvedComplaints || 0}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-yellow-400">
                Pending
              </span>

              <span className="text-white">
                {dashboard.pendingComplaints || 0}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-red-400">
                Escalated
              </span>

              <span className="text-white">
                {dashboard.escalatedComplaints || 0}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Top Performing Officers */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Top Performing Officers
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="text-left py-4 text-gray-400">
                  Officer
                </th>

                <th className="text-left py-4 text-gray-400">
                  Department
                </th>

                <th className="text-left py-4 text-gray-400">
                  Assigned
                </th>

                <th className="text-left py-4 text-gray-400">
                  Resolved
                </th>

                <th className="text-left py-4 text-gray-400">
                  Resolution Rate
                </th>

              </tr>

            </thead>

            <tbody>

              {officers.length > 0 ? (

                officers.map((officer) => (

                  <tr
                    key={officer._id}
                    className="border-b border-slate-800"
                  >

                    <td className="py-4 text-white">
                      {officer.officerName}
                    </td>

                    <td className="text-gray-300">
                      {officer.department}
                    </td>

                    <td className="text-gray-300">
                      {officer.totalAssigned}
                    </td>

                    <td className="text-gray-300">
                      {officer.resolvedComplaints}
                    </td>

                    <td
                      className={`font-semibold ${
                        officer.resolutionRate >= 80
                          ? "text-green-400"
                          : officer.resolutionRate >= 50
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {officer.resolutionRate}%
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400"
                  >
                    No Officer Performance Data
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsReports;