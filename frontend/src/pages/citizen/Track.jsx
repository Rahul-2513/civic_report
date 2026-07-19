import { useState } from "react";

import api from "../../services/api";

function Track() {

  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
  if (!complaintId.trim()) return;

  try {
    setLoading(true);

    const res = await api.get(`/complaints/${complaintId}`);

    if (res.data.success) {
      setComplaint(res.data.complaint);
    }
  } catch (err) {
    console.log(err);
    alert("Complaint not found");
  } finally {
    setLoading(false);
  }

};




  

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">

          Track Complaint 📍

        </h1>

        <p className="mt-3 text-lg text-blue-100">

          Track your complaint status and real-time progress.

        </p>

      </div>

      {/* Search Section */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

  <h2 className="text-2xl font-bold text-gray-800">
    Enter Complaint ID
  </h2>

  <p className="text-gray-500 mt-2">
    Example: 6a5099dba074460cafd2f8a3
  </p>

  <div className="flex gap-4 mt-6">

    <input
      type="text"
      placeholder="Enter Complaint ID"
      value={complaintId}
      onChange={(e) => setComplaintId(e.target.value)}
      className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={handleTrack}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-2xl font-semibold transition"
    >
      {loading ? "Tracking..." : "Track Now"}
    </button>

  </div>

</div>

      {/* Complaint Details */}

      {complaint && (
        <div className="grid grid-cols-3 gap-8 mt-10">


        {/* Left Section */}

        <div className="col-span-2 space-y-8">

          {/* Complaint Info */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">

                  Complaint Details

                </h2>

                <p className="text-gray-500 mt-2">

                  Complete complaint tracking information

                </p>

              </div>

              <span className="bg-blue-100 text-blue-600 px-5 py-3 rounded-full font-semibold">

                {complaint.status}

              </span>

            </div>

            <div className="grid grid-cols-2 gap-8 mt-10">

              <div>

                <p className="text-gray-500">

                  Complaint ID

                </p>

                <h3 className="text-xl font-semibold mt-2">

                  {complaint._id}

                </h3>

              </div>

              <div>

                <p className="text-gray-500">

                  Department

                </p>

                <h3 className="text-xl font-semibold mt-2">

                  {complaint.department}

                </h3>

              </div>

              <div>

                <p className="text-gray-500">

                  Category

                </p>

                <h3 className="text-xl font-semibold mt-2">

                  {complaint.category}

                </h3>

              </div>

              <div>

                <p className="text-gray-500">

                  Date Submitted

                </p>

                <h3 className="text-xl font-semibold mt-2">

                  {new Date(complaint.createdAt).toLocaleDateString("en-IN")}

                </h3>

              </div>

              <div>

                <p className="text-gray-500">

                  Priority

                </p>

                <span className="inline-block mt-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium">

                  {complaint.priority}

                </span>

              </div>

              <div>

                <p className="text-gray-500">

                  Location

                </p>

                <h3 className="text-xl font-semibold mt-2">

                  {complaint.location?.address}

                </h3>

              </div>

            </div>

          </div>

          {/* Timeline */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-10">

              Complaint Progress Timeline

            </h2>

            <div className="flex items-center justify-between">

              {/* Submitted */}

              <div className="flex flex-col items-center">

                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl shadow-lg">

                  ✔

                </div>

                <h3 className="mt-4 font-semibold text-lg">

                  Submitted

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Complaint submitted

                </p>

              </div>

              {/* Line */}

              <div className="flex-1 h-1 bg-green-500 mx-3"></div>

              {/* Verified */}

              <div className="flex flex-col items-center">

                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl shadow-lg">

                  ✔

                </div>

                <h3 className="mt-4 font-semibold text-lg">

                  Verified

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Officer verified

                </p>

              </div>

              {/* Line */}

              <div className="flex-1 h-1 bg-blue-500 mx-3"></div>

              {/* In Progress */}

              <div className="flex flex-col items-center">

                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg animate-pulse">

                  ⏳

                </div>

                <h3 className="mt-4 font-semibold text-lg text-blue-600">

                  In Progress

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Work ongoing

                </p>

              </div>

              {/* Line */}

              <div className="flex-1 h-1 bg-gray-300 mx-3"></div>

              {/* Resolved */}

              <div className="flex flex-col items-center opacity-50">

                <div className="w-16 h-16 rounded-full bg-gray-300 text-white flex items-center justify-center text-2xl shadow-lg">

                  ○

                </div>

                <h3 className="mt-4 font-semibold text-lg">

                  Resolved

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Waiting completion

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="space-y-8">

          {/* Officer Message */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-cyan-500">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">

              Officer Update 💬

            </h2>

            <p className="text-gray-600 leading-relaxed">
                   {complaint.remarks?.length ? complaint.remarks[complaint.remarks.length - 1].message : "No officer update yet."}
                     </p>

            <p className="text-sm text-gray-400 mt-5">

              Updated 2 hours ago

            </p>

          </div>

          {/* Estimated Resolution */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Estimated Resolution ⏱

            </h2>

            <div className="bg-blue-50 rounded-2xl p-6 text-center">

              <h3 className="text-5xl font-bold text-blue-600">

                2 Days

              </h3>

              <p className="text-gray-500 mt-3">

                Expected completion time

              </p>

            </div>

          </div>
      

          {/* Complaint Activity */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Recent Activity 🔔

            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">

                  ✔

                </div>

                <div>

                  <h3 className="font-semibold">

                    Complaint Verified

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    Officer verified your complaint.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">

                  🚧

                </div>

                <div>

                  <h3 className="font-semibold">

                    Team Assigned

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    Maintenance team assigned.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl">

                  ⏳

                </div>

                <div>

                  <h3 className="font-semibold">

                    Work Started

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    Complaint resolution process started.

                  </p>


           </div>
        
        </div>
        </div>
        </div>
        </div>
        </div>
      )}

    </div>
  );
}

export default Track;