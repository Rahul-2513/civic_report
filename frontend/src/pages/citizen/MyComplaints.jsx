import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function MyComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0,
  });
  const [search, setSearch] = useState("");
  
  const fetchComplaints = async () => {
  try {
    const res = await api.get("/complaints/my-complaints");

    if (res.data.success) {
      setComplaints(res.data.complaints);

      setStats({
        total: res.data.count,
        pending: res.data.complaints.filter(
          c => c.status === "Pending"
        ).length,

        resolved: res.data.complaints.filter(
          c => c.status === "Resolved"
        ).length,

        rejected: res.data.complaints.filter(
          c => c.status === "Rejected"
        ).length,
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchComplaints();
}, []);

const filteredComplaints = complaints.filter((item) =>
  item.department.toLowerCase().includes(search.toLowerCase()) ||
  item.category.toLowerCase().includes(search.toLowerCase()) ||
  item.status.toLowerCase().includes(search.toLowerCase()) ||
  item.priority.toLowerCase().includes(search.toLowerCase()) ||
  item._id.toLowerCase().includes(search.toLowerCase())
);


if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading...
    </div>
  );
}

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">

          My Complaints 📋

        </h1>

        <p className="mt-3 text-lg text-blue-100">

          Track and manage all your submitted complaints.

        </p>

      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Total Complaints

          </p>

          <h1 className="text-4xl font-bold text-blue-600 mt-4">

             {stats.total}

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Pending

          </p>

          <h1 className="text-4xl font-bold text-orange-500 mt-4">

            {stats.pending}

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Resolved

          </p>

          <h1 className="text-4xl font-bold text-green-500 mt-4">

            {stats.resolved}

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Rejected

          </p>

          <h1 className="text-4xl font-bold text-red-500 mt-4">

            {stats.rejected}

          </h1>

        </div>

      </div>

      {/* Complaint Table */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        {/* Top Section */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">

              Complaint History

            </h2>

            <p className="text-gray-500 mt-2">

              View all submitted complaints and statuses

            </p>

          </div>

          {/* Search */}

          <input
  type="text"
  placeholder="Search complaints..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
/>

        </div>

        {/* Table */}

        <div className="overflow-x-auto mt-8">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100 text-left">

                <th className="p-4 rounded-l-2xl">

                  Complaint ID

                </th>

                <th className="p-4">

                  Department

                </th>

                <th className="p-4">

                  Category

                </th>

                <th className="p-4">

                  Date

                </th>

                <th className="p-4">

                  Priority

                </th>

                <th className="p-4">

                  Status

                </th>

                <th className="p-4 rounded-r-2xl">

                  Action

                </th>

              </tr>

            </thead>

           <tbody>
  {filteredComplaints.map((item) => (
    <tr
      key={item._id}
      className="border-b hover:bg-gray-50 transition"
    >
      <td className="p-4 font-semibold">
        {item._id.slice(-6).toUpperCase()}
      </td>

      <td className="p-4">
        {item.department}
      </td>

      <td className="p-4">
        {item.category}
      </td>

      <td className="p-4">
        {new Date(item.createdAt).toLocaleDateString("en-IN")}
      </td>

      <td className="p-4">
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            item.priority === "High"
              ? "bg-red-100 text-red-600"
              : item.priority === "Medium"
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {item.priority}
        </span>
      </td>

      <td className="p-4">
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            item.status === "Resolved"
              ? "bg-green-100 text-green-600"
              : item.status === "Pending"
              ? "bg-orange-100 text-orange-600"
              : item.status === "Rejected"
              ? "bg-red-100 text-red-600"
              : item.status === "Assigned"
              ? "bg-blue-100 text-blue-600"
              : item.status === "Escalated"
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      </td>

      <td className="p-4">
        <button
          onClick={() => navigate(`/complaint/${item._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
        >
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-green-500">

          <h3 className="text-xl font-bold text-gray-800">

            Complaint Resolved ✅

          </h3>

          <p className="text-gray-500 mt-3">

            Your railway platform complaint has been resolved successfully.

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-blue-500">

          <h3 className="text-xl font-bold text-gray-800">

            Complaint In Progress 🚧

          </h3>

          <p className="text-gray-500 mt-3">

            Nagar Nigam team is working on your drainage issue.

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-orange-500">

          <h3 className="text-xl font-bold text-gray-800">

            New Update 🔔

          </h3>

          <p className="text-gray-500 mt-3">

            Officer has responded to your street light complaint.

          </p>

        </div>

      </div>

    </div>
  );
}

export default MyComplaints;
