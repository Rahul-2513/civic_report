import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";


function ComplaintDetails() {

 const { id } = useParams();
const [complaint, setComplaint] = useState(null);
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchComplaint();
}, [id]);

const fetchComplaint = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      `/officer/complaints/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComplaint(res.data.complaint);
  } catch (err) {
    console.error(err);
  }
};


const handleResolve = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await api.put(
      `/officer/complaints/${id}/status`,
      {
        status: "Resolved",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    fetchComplaint();
    navigate("/officer/assigned");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to resolve complaint");
  } finally {
    setLoading(false);
  }
};


if (!complaint) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      Loading...
    </div>
  );
}
  

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Complaint Details
          </h1>

          <p className="text-gray-400 mt-2">
            Complaint ID : {complaint._id}
          </p>
        </div>

        <div className="flex gap-3">

          <button className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl">
            Resolve Complaint
          </button>

          <button className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl">
            Escalate Complaint
          </button>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">

          {/* Image */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden">

            <img
              src={complaint.images?.[0]}
              alt="complaint"
              className="w-full h-[400px] object-cover"
            />

          </div>

          {/* Description */}
          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Issue Description
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {complaint.description}
            </p>

          </div>

          {/* Timeline */}
          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Complaint Timeline
            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">

                <div className="w-4 h-4 bg-cyan-500 rounded-full mt-2"></div>

                <div>
                  <h4 className="font-semibold">
                    Complaint Submitted
                  </h4>

                  <p className="text-gray-400">
                   {new Date(complaint.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-2"></div>

                <div>
                  <h4 className="font-semibold">
                    Assigned to Officer
                  </h4>

                  <p className="text-gray-400">
                    06 June 2026 - 09:30 AM
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-4 h-4 bg-gray-500 rounded-full mt-2"></div>

                <div>
                  <h4 className="font-semibold">
                    Awaiting Resolution
                  </h4>

                  <p className="text-gray-400">
                    Current Status
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="space-y-8">

          {/* Citizen Details */}
          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Citizen Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-gray-400">
                  Name
                </p>

                <p className="font-semibold">
                  {complaint.citizen?.name}
                </p>
              </div>

              <div>
                <p className="text-gray-400">
                  Phone
                </p>

                <p className="font-semibold">
                  {complaint.citizen?.phone}
                </p>
              </div>

            </div>

          </div>

          {/* Complaint Info */}
          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Complaint Info
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-gray-400">
                  Department
                </p>

                <p>{complaint.department}</p>
              </div>

              <div>
                <p className="text-gray-400">
                  Issue Type
                </p>

                <p>{complaint.category}</p>
              </div>

              <div>
                <p className="text-gray-400">
                  Location
                </p>

                <p>{complaint.location?.address}</p>
              </div>

              <div>
                <p className="text-gray-400">
                  Date
                </p>

                <p>{new Date(complaint.createdAt).toLocaleString("en-IN")}</p>
              </div>

            </div>

          </div>

          {/* Status Card */}
          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Status
            </h2>

            <div className="flex flex-col gap-4">

              <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl w-fit">
                Priority : {complaint.priority}
              </span>

              <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl w-fit">
                Status : {complaint.status}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;


