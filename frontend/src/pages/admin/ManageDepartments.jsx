import { useState, useEffect } from "react";
import api from "../../services/api";
import DepartmentModal from "./DepartmentModal";
import { useSearchParams, useNavigate } from "react-router-dom";

function ManageDepartments() {

  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [isEdit, setIsEdit] = useState(false);
const [showViewModal, setShowViewModal] = useState(false);
const [searchParams] = useSearchParams();
const navigate = useNavigate();


  const fetchDepartments = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      "/admin/departments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   setDepartments(res.data.departments || []);

  } catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    "Failed to fetch departments."
  );
} finally {
    setLoading(false);
  }
};
const handleToggleStatus = async (id) => {

  const confirmAction = window.confirm(
    "Are you sure you want to change department status?"
  );

  if (!confirmAction) return;

  try {

    const token = localStorage.getItem("token");

    await api.patch(
      `/admin/departments/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Department status updated successfully.");

    await fetchDepartments();

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to update department status."
    );

  }

};
  
useEffect(() => {
  fetchDepartments();
}, []);
  const filteredDepartments = departments.filter((department) =>
  (department.name || "")
  .toLowerCase()
  .includes(search.toLowerCase())
);

useEffect(() => {
  if (searchParams.get("add") === "true") {
    setIsEdit(false);
    setSelectedDepartment(null);
    setShowModal(true);

    // URL se ?add=true hata do
    navigate("/admin/departments", {
      replace: true,
    });
  }
}, [searchParams, navigate]);

  if (loading) {
  return (
    <div className="flex h-screen items-center justify-center text-2xl text-white">
      Loading...
    </div>
  );
}

const stats = {
  totalDepartments: departments.length,

  activeDepartments: departments.filter(
    (d) => d.isActive
  ).length,

  totalOfficers: departments.reduce(
    (sum, d) => sum + d.totalOfficers,
    0
  ),

  totalComplaints: departments.reduce(
    (sum, d) => sum + d.totalComplaints,
    0
  ),
};

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Manage Departments
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all departments and their performance.
          </p>

        </div>

        <button
  onClick={() => {
  setIsEdit(false);
  setSelectedDepartment(null);
  setShowModal(true);
}}
  className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold"
>
  + Add Department
</button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Departments
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.totalDepartments}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Active Departments
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.activeDepartments}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-cyan-400">
            Total Officers
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.totalOfficers}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-yellow-400">
            Total Complaints
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.totalComplaints}
          </h2>

        </div>

      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
        />

      </div>

      {/* Department Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Department Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4 text-gray-300">
  Department
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Description
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Officers
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Complaints
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Pending
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Resolved
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Escalated
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Status
</th>

<th className="text-left px-6 py-4 text-gray-300">
  Actions
</th>

              </tr>

            </thead>

           <tbody>

{filteredDepartments.length > 0 ? (

filteredDepartments.map((department) => (

<tr
key={department._id}
className="border-b border-slate-800 hover:bg-slate-800/40"
>

<td className="px-6 py-4 text-white font-semibold">
{department.name}
</td>

<td className="px-6 py-4 text-gray-300">
{department.description}
</td>

<td className="px-6 py-4 text-cyan-400 font-semibold">
{department.totalOfficers}
</td>

<td className="px-6 py-4 text-yellow-400 font-semibold">
{department.totalComplaints}
</td>

<td className="px-6 py-4 text-orange-400 font-semibold">
{department.pendingComplaints}
</td>

<td className="px-6 py-4 text-green-400 font-semibold">
{department.resolvedComplaints}
</td>

<td className="px-6 py-4 text-red-400 font-semibold">
{department.escalatedComplaints}
</td>

<td className="px-6 py-4">

<span
className={`px-3 py-1 rounded-full text-sm ${
department.isActive
? "bg-green-600 text-white"
: "bg-red-600 text-white"
}`}
>
{department.isActive ? "Active" : "Inactive"}
</span>

</td>

<td className="px-6 py-4 flex gap-2">

<button
  onClick={() => {
    
    setSelectedDepartment(department);
    setShowViewModal(true);
  }}
  className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg text-white transition"
>
  View
</button>

<button
  onClick={() => {
  setSelectedDepartment(department);
  setIsEdit(true);
  setShowModal(true);
}}
  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-white transition"
>
  Edit
</button>

<button
  onClick={() => {
    
    handleToggleStatus(department._id);
  }}
  className={`px-3 py-2 rounded-lg text-white transition ${
    department.isActive
      ? "bg-red-600 hover:bg-red-700"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {department.isActive ? "Disable" : "Enable"}
</button>

</td>

</tr>

))

) : (

<tr>

<td
colSpan="9"
className="text-center py-10 text-gray-400"
>
No Departments Found
</td>

</tr>

)}

</tbody> 

          </table>

        </div>

      </div>

      {/* Performance Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

  <h2 className="text-2xl font-semibold text-white mb-6">
    Department Performance
  </h2>

  <div className="space-y-5">

    {filteredDepartments.map((department) => {

      const performance =
        department.totalComplaints === 0
          ? 0
          : Math.round(
              (department.resolvedComplaints /
                department.totalComplaints) *
                100
            );

      return (

        <div key={department._id}>

          <div className="flex justify-between mb-2">

            <span className="text-white font-medium">
              {department.name}
            </span>

            <span
              className={`font-semibold ${
                performance >= 70
                  ? "text-green-400"
                  : performance >= 40
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {performance}%
            </span>

          </div>

          <div className="w-full bg-slate-800 rounded-full h-3">

            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                performance >= 70
                  ? "bg-green-500"
                  : performance >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${performance}%`,
              }}
            ></div>

          </div>

        </div>

      );

    })}

  </div>

</div>

        
     <DepartmentModal
  show={showModal}
  onClose={() => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedDepartment(null);
  }}
  fetchDepartments={fetchDepartments}
  isEdit={isEdit}
  selectedDepartment={selectedDepartment}
/>
{showViewModal && selectedDepartment && (

  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

    <div className="bg-slate-900 rounded-2xl w-full max-w-2xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Department Details
        </h2>

        <button
  onClick={() => {
    setShowViewModal(false);
    setSelectedDepartment(null);
  }}
  className="text-white text-2xl"
>
  ✕
</button>

      </div>

      <div className="space-y-5">

        <div>
          <p className="text-gray-400">Department</p>
          <p className="text-white">{selectedDepartment.name}</p>
        </div>

        <div>
          <p className="text-gray-400">Description</p>
          <p className="text-white">
            {selectedDepartment.description}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Posts</p>

          <div className="flex flex-wrap gap-2 mt-2">

            {selectedDepartment.posts?.map((post, index) => (

              <span
                key={index}
                className="bg-cyan-700 px-3 py-1 rounded-full text-white text-sm"
              >
                {post}
              </span>

            ))}

          </div>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-gray-400">Total Officers</p>
            <p className="text-white">
              {selectedDepartment.totalOfficers}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Total Complaints</p>
            <p className="text-white">
              {selectedDepartment.totalComplaints}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Pending</p>
            <p className="text-yellow-400">
              {selectedDepartment.pendingComplaints}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Resolved</p>
            <p className="text-green-400">
              {selectedDepartment.resolvedComplaints}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => {
            setShowViewModal(false);
              setSelectedDepartment(null);
                 }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white"
        >
          Close
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  );
}

export default ManageDepartments;
