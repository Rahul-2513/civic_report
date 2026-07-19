import { useState, useEffect } from "react";
import axios from "axios";

function EscalateModal({
  show,
  onClose,
  complaint,
  fetchComplaints,
}) {
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  useEffect(() => {
  if (show) {
    setReason("");
    setRemarks("");
    setSubmitted(false);
  }
}, [show]);

  if (!show || !complaint) return null;
  const handleEscalate = async () => {
    setSubmitted(true);

      if (!reason) {
        return;
         }

  

  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/complaints/${complaint._id}/escalate`,
      {
        reason,
        remarks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchComplaints();
     setReason("");
     setRemarks("");
     setSubmitted(false);

    onClose();

  } catch (error) {

    console.error(error);
     console.log(error.response);
  console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to escalate complaint."
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

     <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Escalate Complaint
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Send this complaint to higher authority.
            </p>

          </div>

          <button
            onClick={() => {
             setReason("");
             setRemarks("");
             setSubmitted(false);
             onClose();
                }}
            className="rounded-lg bg-slate-800 px-3 py-2 text-white hover:bg-slate-700"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

  {/* ================= Complaint Details ================= */}

  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

      <div>

        <h3 className="text-2xl font-bold text-white">
          Complaint Details
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Complete complaint information before escalation.
        </p>

      </div>

      <div className="mt-4 md:mt-0 flex gap-3">

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            complaint.status === "Pending"
              ? "bg-yellow-600 text-white"
              : complaint.status === "Assigned"
              ? "bg-blue-600 text-white"
              : complaint.status === "Resolved"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {complaint.status}
        </span>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            complaint.priority === "High"
              ? "bg-red-600 text-white"
              : complaint.priority === "Medium"
              ? "bg-yellow-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {complaint.priority}
        </span>

      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

      <div>

        <p className="text-gray-400 text-sm">
          Complaint ID
        </p>

        <p className="text-white font-semibold mt-1">
          {`CMP-${complaint._id.slice(-5).toUpperCase()}`}
        </p>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Department
        </p>

        <p className="text-cyan-400 font-medium mt-1">
          {complaint.department}
        </p>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Category
        </p>

        <p className="text-white mt-1">
          {complaint.category}
        </p>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Escalation Level
        </p>

        <p className="text-white mt-1">
          Level {complaint.escalationLevel}
        </p>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Created On
        </p>

        <p className="text-white mt-1">
          {new Date(complaint.createdAt).toLocaleString()}
        </p>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Last Updated
        </p>

        <p className="text-white mt-1">
          {new Date(complaint.updatedAt).toLocaleString()}
        </p>

      </div>

    </div>

    <div className="mt-8">

      <p className="text-gray-400 text-sm">
        Complaint Title
      </p>

      <p className="text-white text-lg font-semibold mt-2">
        {complaint.title}
      </p>

    </div>

    <div className="mt-6">

      <p className="text-gray-400 text-sm">
        Description
      </p>

      <div className="mt-2 rounded-xl bg-slate-900 border border-slate-700 p-4">

        <p className="text-gray-300 leading-7">
          {complaint.description}
        </p>

      </div>

    </div>

  </div>

</div>

    
        {/* ================= Citizen Information ================= */}

<div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

  <h3 className="text-2xl font-bold text-white">
    Citizen Information
  </h3>

  <p className="text-sm text-gray-400 mt-1">
    Complaint submitted by
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

    <div>

      <p className="text-sm text-gray-400">
        Full Name
      </p>

      <p className="text-white font-semibold mt-1">
        {complaint.citizen?.name}
      </p>

    </div>

    <div>

      <p className="text-sm text-gray-400">
        Email
      </p>

      <p className="text-white mt-1 break-all">
        {complaint.citizen?.email}
      </p>

    </div>

    <div>

      <p className="text-sm text-gray-400">
        Phone Number
      </p>

      <p className="text-white mt-1">
        {complaint.citizen?.phone || "Not Available"}
      </p>

    </div>

  </div>

</div>

{/* ================= Assigned Officer ================= */}

<div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-2xl font-bold text-white">
        Assigned Officer
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        Current officer handling this complaint
      </p>

    </div>

    {complaint.assignedOfficer && (
      <span className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium">
        Active
      </span>
    )}

  </div>

  {complaint.assignedOfficer ? (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

      <div>

        <p className="text-sm text-gray-400">
          Officer Name
        </p>

        <p className="text-white font-semibold mt-1">
          {complaint.assignedOfficer.name}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-400">
          Employee ID
        </p>

        <p className="text-white mt-1">
          {complaint.assignedOfficer.employeeId}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-400">
          Department
        </p>

        <p className="text-cyan-400 mt-1">
          {complaint.assignedOfficer.department}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-400">
          Post
        </p>

        <p className="text-white mt-1">
          {complaint.assignedOfficer.post}
        </p>

      </div>

    </div>

  ) : (

    <div className="mt-8 rounded-xl border border-yellow-600 bg-yellow-600/10 p-5">

      <p className="text-yellow-400 font-medium">
        No Officer Assigned
      </p>

      <p className="text-gray-400 mt-2">
        This complaint has not been assigned to any officer yet.
      </p>

    </div>

  )}

</div>

{/* ================= Complaint Images ================= */}

<div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

  <h3 className="text-2xl font-bold text-white">
    Complaint Images
  </h3>

  <p className="text-sm text-gray-400 mt-1">
    Images uploaded by the citizen
  </p>

  {complaint.images?.length > 0 ? (

    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">

      {complaint.images.map((image, index) => (

        <div
          key={index}
          className="overflow-hidden rounded-xl border border-slate-700"
        >

          <img
            src={image}
            alt={`Complaint ${index + 1}`}
            className="h-52 w-full object-cover transition duration-300 hover:scale-105 cursor-pointer"
          />

        </div>

      ))}

    </div>

  ) : (

    <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-8 text-center">

      <p className="text-gray-500">
        No Complaint Images Available
      </p>

    </div>

  )}

</div>

{/* ================= Complaint Location ================= */}

<div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

  <h3 className="text-2xl font-bold text-white">
    Complaint Location
  </h3>

  <p className="text-sm text-gray-400 mt-1">
    Reported complaint location
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

    <div>

      <p className="text-sm text-gray-400">
        Address
      </p>

      <p className="text-white mt-2 break-words">
        {complaint.location?.address || "Not Available"}
      </p>

    </div>

    <div className="flex items-end">

      {complaint.location?.address ? (

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            complaint.location.address
          )}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-cyan-600 px-5 py-3 font-medium text-white transition hover:bg-cyan-700"
        >
          View on Google Maps
        </a>

      ) : (

        <span className="text-gray-500">
          Location Not Available
        </span>

      )}

    </div>

  </div>

</div>

{/* ================= Officer Remarks ================= */}

<div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

  <h3 className="text-2xl font-bold text-white">
    Officer Remarks
  </h3>

  <p className="text-sm text-gray-400 mt-1">
    Previous updates from assigned officers
  </p>

  {complaint.remarks?.length > 0 ? (

    <div className="mt-8 space-y-5">

      {complaint.remarks.map((remark, index) => (

        <div
          key={index}
          className="rounded-xl border border-slate-700 bg-slate-900 p-5"
        >

          <div className="flex justify-between">

            <h4 className="font-semibold text-white">
              {remark.officer?.name || "Officer"}
            </h4>

            <span className="text-xs text-gray-500">
              {remark.createdAt
                ? new Date(
                    remark.createdAt
                  ).toLocaleString()
                : ""}
            </span>

          </div>

          <p className="mt-3 text-gray-300">
            {remark.text || remark.remark}
          </p>

        </div>

      ))}

    </div>

  ) : (

    <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-8 text-center">

      <p className="text-gray-500">
        No Officer Remarks Available
      </p>

    </div>

  )}

</div>

{/* ================= Escalation Form ================= */}

<div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

  <h3 className="text-2xl font-bold text-white">
    Escalation Details
  </h3>

  <p className="text-sm text-gray-400 mt-1">
    Select the reason and provide remarks before escalating.
  </p>

  {/* Escalation Reason */}

  <div className="mt-8">

    <label className="block text-sm font-medium text-gray-300 mb-2">
      Escalation Reason <span className="text-red-500">*</span>
    </label>

    <select
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      className={`w-full rounded-xl border px-4 py-3 bg-slate-900 text-white outline-none transition ${
        submitted && !reason
          ? "border-red-500"
          : "border-slate-700 focus:border-cyan-500"
      }`}
    >
      <option value="">
        Select Escalation Reason
      </option>

      <option value="Officer did not respond within time">
        Officer did not respond within time
      </option>

      <option value="Complaint still unresolved">
        Complaint still unresolved
      </option>

      <option value="Citizen requested escalation">
        Citizen requested escalation
      </option>

      <option value="Incorrect officer assigned">
        Incorrect officer assigned
      </option>

      <option value="High Priority Issue">
        High Priority Issue
      </option>

    </select>

    {submitted && !reason && (
      <p className="mt-2 text-sm text-red-400">
        Please select an escalation reason.
      </p>
    )}

  </div>

  {/* Remarks */}

  <div className="mt-8">

    <label className="block text-sm font-medium text-gray-300 mb-2">
      Admin Remarks
    </label>

    <textarea
      rows={6}
      maxLength={300}
      value={remarks}
      onChange={(e) => setRemarks(e.target.value)}
      placeholder="Write remarks for higher authority..."
      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none resize-none focus:border-cyan-500"
    />

    <div className="mt-2 flex justify-between">

      <p className="text-xs text-gray-500">
        Maximum 300 characters
      </p>

      <p
        className={`text-xs ${
          remarks.length > 250
            ? "text-yellow-400"
            : "text-gray-500"
        }`}
      >
        {remarks.length}/300
      </p>

    </div>

  </div>

</div>

{/* ================= Footer ================= */}

<div className="flex flex-col md:flex-row justify-end gap-4 border-t border-slate-700 px-6 py-5">

  <button
    onClick={() => {
      setReason("");
      setRemarks("");
      setSubmitted(false);
      onClose();
    }}
    className="rounded-xl border border-slate-600 bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-600"
  >
    Cancel
  </button>

  <button
    disabled={loading}
    onClick={handleEscalate}
    className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? (
      <div className="flex items-center gap-2">

        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

        <span>Escalating...</span>

      </div>
    ) : (
      "Escalate Complaint"
    )}
  </button>

</div>

        
      </div>

    </div>
  );
  
}


export default EscalateModal;