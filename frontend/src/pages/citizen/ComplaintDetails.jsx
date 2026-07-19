import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function ComplaintDetails() {

  
const { id } = useParams();

const [complaint, setComplaint] = useState(null);
const [loading, setLoading] = useState(true);

const fetchComplaint = async () => {
  try {
    const res = await api.get(`/complaints/${id}`);

    if (res.data.success) {
      setComplaint(res.data.complaint);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchComplaint();
}, [id]);
  

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-xl">
      Loading...
    </div>
  );
}

if (!complaint) {
  return (
    <div className="text-center mt-20">
      Complaint Not Found
    </div>
  );
}

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">

          Complaint Details 📋

        </h1>

        <p className="mt-3 text-lg text-blue-100">

          View complete complaint history and tracking details.

        </p>

      </div>

      {/* Main Section */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        {/* Left Section */}

        <div className="col-span-2 space-y-8">

          {/* Complaint Information */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">

              Complaint Information

            </h2>

            <div className="grid grid-cols-2 gap-6">

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
                  Date
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
                  Status
                </p>

                <span
className={`inline-block mt-2 px-4 py-2 rounded-full font-medium ${
 complaint.status==="Resolved"
 ?"bg-green-100 text-green-600"
 : complaint.status==="Pending"
 ?"bg-orange-100 text-orange-600"
 : complaint.status==="Assigned"
 ?"bg-blue-100 text-blue-600"
 : complaint.status==="Escalated"
 ?"bg-purple-100 text-purple-600"
 :"bg-red-100 text-red-600"
}`}
>
 {complaint.status}
</span>

              </div>

            </div>

          </div>

          {/* Description */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Complaint Description

            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">

              {complaint.description}

            </p>

          </div>

          {/* Uploaded Image */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Uploaded Evidence

            </h2>

            <img
              src={complaint.images?.[0]}
              alt="Complaint"
              className="w-full h-[400px] object-cover rounded-3xl"
            />

          </div>

        </div>

        {/* Right Section */}

        <div className="space-y-8">

          {/* Location */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Live Location 📍

            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">

              {complaint.location?.address}

            </p>

          </div>

          {/* Timeline */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">

              Complaint Timeline

            </h2>

            <div className="space-y-8">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl">

                  ✔

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    Complaint Submitted

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Complaint registered successfully.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl">

                  ✔

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    Complaint Verified

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Officer verified your complaint.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">

                  ⏳

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    Work In Progress

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Cleaning team assigned to the location.

                  </p>

                </div>

              </div>

              <div className="flex gap-4 opacity-50">

                <div className="w-12 h-12 rounded-full bg-gray-300 text-white flex items-center justify-center text-xl">

                  ○

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    Complaint Resolved

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Waiting for final resolution.

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Officer Message */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-cyan-500">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">

              Officer Response 💬

            </h2>

            <p className="text-gray-600 leading-relaxed">

              {complaint.remarks.length > 0 ? complaint.remarks[complaint.remarks.length-1].message: "No officer response yet."}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;