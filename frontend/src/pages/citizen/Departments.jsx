import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await api.get("/departments/public/all");

      if (res.data.success) {
        setDepartments(res.data.departments || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const getColor = (name) => {
    switch (name) {
      case "Railway":
        return "from-blue-500 to-cyan-500";
      case "Gram Panchayat":
        return "from-green-500 to-emerald-500";
      case "Nagar Nigam":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getIcon = (name) => {
    switch (name) {
      case "Railway":
        return "🚆";
      case "Gram Panchayat":
        return "🌾";
      case "Nagar Nigam":
        return "🏛️";
      default:
        return "🏢";
    }
  };

  const filteredDepartments = departments.filter((department) => {
    const query = search.toLowerCase();

    return (
      department.name.toLowerCase().includes(query) ||
      department.description.toLowerCase().includes(query) ||
      department.posts.some((post) =>
        post.toLowerCase().includes(query)
      )
    );
  });

  const totalOfficers = departments.reduce(
    (total, department) => total + (department.totalOfficers || 0),
    0
  );
  const totalResolved = departments.reduce(
    (total, department) =>
      total + (department.resolvedComplaints || 0),
    0
  );
  const totalPending = departments.reduce(
    (total, department) =>
      total + (department.pendingComplaints || 0),
    0
  );
  const departmentsWithRate = departments.map((department) => {
    const totalComplaints = department.totalComplaints || 0;
    const resolvedComplaints =
      department.resolvedComplaints || 0;

    return {
      ...department,
      resolutionRate:
        totalComplaints > 0
          ? Math.round(
              (resolvedComplaints / totalComplaints) * 100
            )
          : 0,
    };
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading departments...
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Departments & Services 🏛
        </h1>

        <p className="mt-3 text-lg text-blue-100">
          Choose the appropriate department for your civic issue reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Total Departments
          </p>

          <h1 className="text-4xl font-bold text-blue-600 mt-4">
            {departments.length}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Total Officers
          </p>

          <h1 className="text-4xl font-bold text-cyan-500 mt-4">
            {totalOfficers}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Resolved Complaints
          </p>

          <h1 className="text-4xl font-bold text-green-500 mt-4">
            {totalResolved}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Pending Complaints
          </p>

          <h1 className="text-4xl font-bold text-orange-500 mt-4">
            {totalPending}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Available Departments
            </h2>

            <p className="text-gray-500 mt-2">
              Explore all civic departments and services
            </p>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search department..."
            className="border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        {filteredDepartments.map((item) => {
          const resolutionRate =
            item.totalComplaints > 0
              ? Math.round(
                  ((item.resolvedComplaints || 0) /
                    item.totalComplaints) *
                    100
                )
              : 0;

          return (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-[1.01] transition duration-300"
            >
              <div
                className={`bg-gradient-to-r ${getColor(item.name)} p-8 text-white`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-5xl">
                      {getIcon(item.name)}
                    </h1>

                    <h2 className="text-3xl font-bold mt-5">
                      {item.name}
                    </h2>

                    <p className="text-white/90 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-center min-w-[120px]">
                    <h3 className="text-2xl font-bold">
                      {item.totalComplaints || 0}
                    </h3>

                    <p className="text-sm">
                      Active Cases
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-5">
                  Services
                </h3>

                <div className="space-y-3">
                  {item.posts.map((post, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <p>{post}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="bg-gray-50 rounded-2xl p-5 text-center">
                    <p className="text-gray-500 text-sm">
                      Resolution Rate
                    </p>

                    <h3 className="text-2xl font-bold text-green-500 mt-2">
                      {resolutionRate}%
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 text-center">
                    <p className="text-gray-500 text-sm">
                      Officers
                    </p>

                    <h3 className="text-2xl font-bold text-blue-500 mt-2">
                      {item.totalOfficers || 0}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div className="bg-gray-50 rounded-2xl p-5 text-center">
                    <p className="text-gray-500 text-sm">
                      Pending
                    </p>

                    <h3 className="text-2xl font-bold text-orange-500 mt-2">
                      {item.pendingComplaints || 0}
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 text-center">
                    <p className="text-gray-500 text-sm">
                      Escalated
                    </p>

                    <h3 className="text-2xl font-bold text-red-500 mt-2">
                      {item.escalatedComplaints || 0}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => navigate("/report")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition"
                  >
                    Report Issue
                  </button>

                  <button
                    type="button"
                    className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-2xl font-semibold transition"
                  >
                    {item.posts.length} Services
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="mt-10 rounded-3xl bg-white p-10 text-center text-gray-500 shadow-lg">
          No departments matched your search.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Department Performance 📈
          </h2>

          <div className="space-y-8">
            {departmentsWithRate.map((department) => (
              <div key={department._id}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    {department.name}
                  </h3>

                  <p className="text-green-500 font-bold">
                    {department.resolutionRate}%
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${department.resolutionRate}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Department Snapshot ☎
          </h2>

          <div className="space-y-6">
            {departments.map((department) => (
              <div
                key={department._id}
                className="rounded-2xl p-6 border border-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-800">
                  {department.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {department.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-blue-700">
                    Officers: {department.totalOfficers || 0}
                  </span>

                  <span className="rounded-full bg-green-50 px-4 py-2 text-green-700">
                    Resolved: {department.resolvedComplaints || 0}
                  </span>

                  <span className="rounded-full bg-orange-50 px-4 py-2 text-orange-700">
                    Pending: {department.pendingComplaints || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Departments;
