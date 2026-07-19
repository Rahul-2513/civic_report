import { useEffect, useState } from "react";
import axios from "axios";
import OfficerModal from "./OfficerModal";
import { useSearchParams, useNavigate } from "react-router-dom";


function ManageOfficers() {
const [officers, setOfficers] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);
const [isEdit, setIsEdit] = useState(false);
const [showViewModal, setShowViewModal] = useState(false);
const [selectedOfficer, setSelectedOfficer] = useState(null);
const [searchParams] = useSearchParams();
const navigate = useNavigate();

  useEffect(() => {
  fetchOfficers();
}, []);

useEffect(() => {
  if (searchParams.get("add") === "true") {
    setIsEdit(false);
    setSelectedOfficer(null);
    setShowModal(true);

    navigate("/admin/officers", { replace: true });
  }
}, [searchParams, navigate]);

const fetchOfficers = async () => {


  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/officers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOfficers(res.data.officers);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this officer?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/admin/officers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Officer deleted successfully");

    fetchOfficers(); // Refresh table

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message || "Failed to delete officer"
    );
  }
};

const filteredOfficers = officers.filter((officer) => {
  return (
    officer.name.toLowerCase().includes(search.toLowerCase()) ||
    officer.employeeId.toLowerCase().includes(search.toLowerCase()) ||
    officer.department.toLowerCase().includes(search.toLowerCase()) ||
    officer.post.toLowerCase().includes(search.toLowerCase())
  );
});
  
 
  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-white text-2xl">
      Loading...
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>
         

          <h1 className="text-4xl font-bold text-white">
            Manage Officers
          </h1>

          <p className="text-gray-400 mt-2">
            Add, update and manage officer accounts.
          </p>

        </div>

        <button
  onClick={() => {
    setIsEdit(false);
    setSelectedOfficer(null);
    setShowModal(true);
  }}
  className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold"
>
  + Add Officer
</button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Officers
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
           {officers.length}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Active Officers
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            {officers.filter((o) => o.status === "active").length}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Inactive Officers
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-3">
           {
officers.filter(o=>!o.isActive).length
}
          </h2>

        </div>

      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <input
          type="text"
          placeholder="Search by Officer Name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-cyan-500"
        />

      </div>

      {/* Officers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Officer Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4 text-gray-300">
                  Employee ID
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Post
                </th>
                <th className="text-left px-6 py-4 text-gray-300">
                  Phone Number
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

  {filteredOfficers.length > 0 ? (

    filteredOfficers.map((officer) => (

      <tr
        key={officer._id}
        className="border-b border-slate-800 hover:bg-slate-800/40"
      >

        <td className="px-6 py-4 text-white">
          {officer.employeeId}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {officer.name}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {officer.department}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {officer.post}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {officer.phone}
        </td>

        <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      officer.isActive
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white"
    }`}
  >
    {officer.isActive ? "Active" : "Inactive"}
  </span>
</td>


        <td className="px-6 py-4 flex gap-2">

          <button
  onClick={() => {
    setSelectedOfficer(officer);
    setShowViewModal(true);
  }}
  className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg text-white"
>
  View
</button>

          <button
  onClick={() => {
    setIsEdit(true);
    setSelectedOfficer(officer);
    setShowModal(true);
  }}
  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-white"
>
  Edit
</button>

          <button
  onClick={() => handleDelete(officer._id)}
  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white"
>
  Delete
</button>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="7"
        className="text-center py-8 text-gray-400"
      >
        No Officers Found
      </td>

    </tr>

  )}

</tbody>

          </table>

        </div>

      </div>
       <OfficerModal
  show={showModal}
  onClose={() => setShowModal(false)}
  fetchOfficers={fetchOfficers}
  isEdit={isEdit}
  selectedOfficer={selectedOfficer}
/>
{showViewModal && selectedOfficer && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

    <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-xl">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Officer Details
        </h2>

        <button
          onClick={() => setShowViewModal(false)}
          className="text-white text-2xl"
        >
          ✕
        </button>

      </div>

      <div className="space-y-4 text-gray-300">

        <p><strong>Name:</strong> {selectedOfficer.name}</p>

        <p><strong>Email:</strong> {selectedOfficer.email}</p>

        <p><strong>Employee ID:</strong> {selectedOfficer.employeeId}</p>

        <p><strong>Department:</strong> {selectedOfficer.department}</p>

        <p><strong>Post:</strong> {selectedOfficer.post}</p>

        <p><strong>Phone:</strong> {selectedOfficer.phone}</p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedOfficer.isActive ? "Active" : "Inactive"}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(selectedOfficer.createdAt).toLocaleString()}
        </p>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => setShowViewModal(false)}
          className="bg-cyan-600 px-5 py-3 rounded-xl text-white"
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

export default ManageOfficers;