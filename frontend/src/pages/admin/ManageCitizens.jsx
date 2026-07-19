import { useState, useEffect } from "react";
import axios from "axios";
import HistoryModal from "../../components/HistoryModal";
function ManageCitizens() {

  const [search, setSearch] = useState("");
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);


  const fetchCitizens = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/citizens",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCitizens(res.data.citizens);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleToggleStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/citizens/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCitizens();

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to update citizen status."
    );
  }
};

useEffect(() => {
  fetchCitizens();
}, []);


 const filteredCitizens = citizens.filter((citizen) =>
  (citizen.name || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (citizen.email || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);


if (loading) {
  return (
    <div className="flex h-screen items-center justify-center text-2xl text-white">
      Loading...
    </div>
  );
}

const stats = {
  totalCitizens: citizens.length,

  activeCitizens: citizens.filter(
    (c) => c.isActive
  ).length,

  blockedCitizens: citizens.filter(
    (c) => !c.isActive
  ).length,

  newRegistrations: citizens.filter((c) => {
    const createdDate = new Date(c.createdAt);
    const today = new Date();

    return (
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear()
    );
  }).length,
};



  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Manage Citizens
          </h1>

          <p className="text-gray-400 mt-2">
            View, monitor and manage registered citizens.
          </p>

        </div>

        <button className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold">
          Export Citizens
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Citizens
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.totalCitizens}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Active Citizens
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
           {stats.activeCitizens}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-red-400">
            Blocked Citizens
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.blockedCitizens}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-cyan-400">
            New Registrations
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {stats.newRegistrations}
          </h2>

        </div>

      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <input
          type="text"
          placeholder="Search by Citizen ID, Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
        />

      </div>

      {/* Citizens Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Citizen Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4 text-gray-300">
                  Citizen ID
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Phone
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Complaints
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

  {filteredCitizens.length > 0 ? (

    filteredCitizens.map((citizen) => (

      <tr
        key={citizen._id}
        className="border-b border-slate-800 hover:bg-slate-800/40"
      >

        <td className="px-6 py-4 text-white">
          {citizen._id.slice(-6).toUpperCase()}
        </td>

        <td className="px-6 py-4 text-white">
          {citizen.name}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {citizen.email}
        </td>

        <td className="px-6 py-4 text-gray-300">
          {citizen.phone || "N/A"}
        </td>

        <td className="px-6 py-4 text-cyan-400">
          {citizen.totalComplaints || 0}
        </td>

        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              citizen.isActive
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {citizen.isActive ? "Active" : "Blocked"}
          </span>
        </td>

        <td className="px-6 py-4 flex gap-2">

<button
  onClick={() => {
    setSelectedCitizen(citizen);
    setShowViewModal(true);
  }}
  className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-lg text-white"
>
  View
</button>

          <button
  onClick={() => {
    setSelectedCitizen(citizen);
    setShowHistoryModal(true);
  }}
  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-white"
>
  History
</button>

          <button
  onClick={() => handleToggleStatus(citizen._id)}
  className={`px-3 py-2 rounded-lg text-white ${
    citizen.isActive
      ? "bg-red-600 hover:bg-red-700"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {citizen.isActive ? "Block" : "Unblock"}
</button>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="7"
        className="py-8 text-center text-gray-400"
      >
        No Citizens Found
      </td>

    </tr>

  )}

</tbody>

          </table>

        </div>

      </div>

      {showViewModal && selectedCitizen && (

  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-2xl">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Citizen Details
        </h2>

        <button
          onClick={() => setShowViewModal(false)}
          className="text-white text-2xl"
        >
          ✕
        </button>

      </div>

      <div className="grid grid-cols-2 gap-6 text-gray-300">

        <div>
          <p className="text-gray-400">Name</p>
          <p>{selectedCitizen.name}</p>
        </div>

        <div>
          <p className="text-gray-400">Email</p>
          <p>{selectedCitizen.email}</p>
        </div>

        <div>
          <p className="text-gray-400">Phone</p>
          <p>{selectedCitizen.phone || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-400">Status</p>
          <p>
            {selectedCitizen.isActive
              ? "Active"
              : "Blocked"}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-400">Address</p>
          <p>{selectedCitizen.address || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-400">
            Last Login
          </p>
          <p>
            {selectedCitizen.lastLogin
              ? new Date(
                  selectedCitizen.lastLogin
                ).toLocaleString()
              : "Never"}
          </p>
        </div>

        <div>
          <p className="text-gray-400">
            Registered On
          </p>
          <p>
            {new Date(
              selectedCitizen.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => setShowViewModal(false)}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white"
        >
          Close
        </button>

      </div>

    </div>

  </div>

)}

<HistoryModal
  show={showHistoryModal}
  onClose={() => setShowHistoryModal(false)}
  citizenId={selectedCitizen?._id}
/>

    </div>
  );
}

export default ManageCitizens;
