function ViewComplaintModal({ show, onClose, complaint }) {

  if (!show || !complaint) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Complaint Details
          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            ✕
          </button>

        </div>

        {/* 👇 Yahan tumhara poora code aayega */}
        <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">

  {/* Complaint Information */}
  <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

    <h3 className="text-xl font-semibold text-white mb-5">
      Complaint Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>
        <p className="text-gray-400 text-sm">Complaint ID</p>
        <p className="text-white font-semibold">
          {`CMP-${complaint._id.slice(-5).toUpperCase()}`}
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Status</p>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            complaint.status === "Resolved"
              ? "bg-green-600 text-white"
              : complaint.status === "Escalated"
              ? "bg-red-600 text-white"
              : complaint.status === "Assigned"
              ? "bg-blue-600 text-white"
              : "bg-yellow-600 text-white"
          }`}
        >
          {complaint.status}
        </span>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Department</p>
        <p className="text-white">{complaint.department}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Category</p>
        <p className="text-white">{complaint.category}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Priority</p>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
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

      <div>
        <p className="text-gray-400 text-sm">Created On</p>
        <p className="text-white">
          {new Date(complaint.createdAt).toLocaleString()}
        </p>
      </div>

    </div>

    <div className="mt-5">
      <p className="text-gray-400 text-sm">Title</p>
      <p className="text-white">{complaint.title}</p>
    </div>

    <div className="mt-5">
      <p className="text-gray-400 text-sm">Description</p>
      <p className="text-white leading-7">
        {complaint.description}
      </p>
    </div>

  </div>

  {/* Citizen Details */}

  <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

    <h3 className="text-xl font-semibold text-white mb-5">
      Citizen Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>
        <p className="text-gray-400 text-sm">Name</p>
        <p className="text-white">{complaint.citizen?.name || "-"}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Email</p>
        <p className="text-white">{complaint.citizen?.email || "-"}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Phone</p>
        <p className="text-white">{complaint.citizen?.phone || "-"}</p>
      </div>

    </div>

  </div>

  {/* Assigned Officer */}

  <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

    <h3 className="text-xl font-semibold text-white mb-5">
      Assigned Officer
    </h3>

    {complaint.assignedOfficer ? (

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <p className="text-gray-400 text-sm">Officer Name</p>
          <p className="text-white">
            {complaint.assignedOfficer.name}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Employee ID</p>
          <p className="text-white">
            {complaint.assignedOfficer.employeeId}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Post</p>
          <p className="text-white">
            {complaint.assignedOfficer.post}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Department</p>
          <p className="text-white">
            {complaint.assignedOfficer.department}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-white">
            {complaint.assignedOfficer.email}
          </p>
        </div>

      </div>

    ) : (

      <p className="text-yellow-400">
        No Officer Assigned
      </p>

    )}

  </div>

  {/* Escalation */}

  <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

    <h3 className="text-xl font-semibold text-white mb-5">
      Escalation Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>
        <p className="text-gray-400 text-sm">Escalation Level</p>
        <p className="text-white">
          {complaint.escalationLevel || 0}
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Reason</p>
        <p className="text-white">
          {complaint.escalationReason || "Not Escalated"}
        </p>
      </div>

    </div>

  </div>

  {/* Escalation History */}

<div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

  <h3 className="text-xl font-semibold text-white mb-5">
    Escalation History
  </h3>

  {complaint.escalationHistory?.length > 0 ? (

    <div className="space-y-4">
      

      {complaint.escalationHistory.map((item, index) => (

        <div
          key={index}
          className="rounded-xl border border-slate-700 bg-slate-900 p-5"
        >

          <div
            key={index}
             className="rounded-xl border border-slate-700 bg-slate-900 p-5"
                             >
            <h4 className="text-cyan-400 text-lg font-semibold mb-4">
             Escalation #{index + 1}
             </h4>

            <div>

              <p className="text-sm text-gray-400">
                From Officer
              </p>

              <p className="text-white font-semibold">
                {item.fromOfficer?.name}
              </p>

              <p className="text-cyan-400 text-sm">
                {item.fromOfficer?.post}
              </p>

              <p className="text-gray-500 text-sm">
                {item.fromOfficer?.employeeId}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-400">
                To Officer
              </p>

              <p className="text-white font-semibold">
                {item.toOfficer?.name}
              </p>

              <p className="text-green-400 text-sm">
                {item.toOfficer?.post}
              </p>

              <p className="text-gray-500 text-sm">
                {item.toOfficer?.employeeId}
              </p>

            </div>

          </div>

          <div className="mt-4">

            <p className="text-sm text-gray-400">
              Escalation Reason
            </p>

            <p className="text-white">
              {item.reason}
            </p>

          </div>

          <div className="mt-3 flex justify-between text-sm">

            <span className="text-gray-400">
              Escalated By :
              <span className="text-white ml-2">
                {item.escalatedBy?.name}
              </span>
            </span>

            <span className="text-gray-500">
              {new Date(item.escalatedAt).toLocaleString()}
            </span>

          </div>

        </div>

      ))}

    </div>

  ) : (

    <div className="rounded-xl bg-slate-900 p-5 text-center text-gray-400">

      No Escalation History Available

    </div>

  )}

</div>

  {/* Location */}
<div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

  <h3 className="text-xl font-semibold text-white mb-5">
    Location
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div>
      <p className="text-gray-400 text-sm">
        Address
      </p>

      <p className="text-white">
        {complaint.location?.address || "Not Available"}
      </p>
    </div>

    <div>
      <p className="text-gray-400 text-sm">
        Coordinates
      </p>

      <p className="text-white">
        {complaint.location?.latitude},{" "}
        {complaint.location?.longitude}
      </p>
    </div>

  </div>

</div>


  {/* Images */}

  <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">

    <h3 className="text-xl font-semibold text-white mb-5">
      Complaint Images
    </h3>

    {complaint.images?.length ? (

      <div className="grid grid-cols-2 gap-4">

        {complaint.images.map((image, index) => (

          <img
             key={index}
              src={image}
             alt="Complaint"
             onClick={() => window.open(image, "_blank")}
             className="cursor-pointer rounded-xl h-52 w-full object-cover border border-slate-700 hover:scale-105 transition"
/>

        ))}

      </div>

    ) : (

      <div className="h-44 rounded-xl bg-slate-700 flex items-center justify-center text-gray-400">
        No Images Available
      </div>

    )}

  </div>

</div>

        

      </div>

    </div>

  );
}

export default ViewComplaintModal;
