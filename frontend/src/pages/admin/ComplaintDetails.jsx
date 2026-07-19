function ComplaintDetails() {

  const complaint = {
    id: "CMP1023",
    title: "Garbage Dump Near Railway Station",
    description:
      "Large amount of garbage has accumulated near the railway station entrance causing foul smell and unhygienic conditions.",
    citizenName: "Rohan Kumar",
    citizenEmail: "rohan@gmail.com",
    citizenPhone: "+91 9876543210",
    department: "Railway Department",
    location: "Platform Road, Patna Junction",
    priority: "High",
    status: "Pending",
    date: "14 June 2026",
    assignedOfficer: "Rahul Kumar",
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Complaint Details
          </h1>

          <p className="text-gray-400 mt-2">
            Complete complaint information and management actions.
          </p>

        </div>

        <span className="bg-yellow-600 text-white px-4 py-2 rounded-xl">
          {complaint.status}
        </span>

      </div>

      {/* Complaint Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Complaint Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-400">
              Complaint ID
            </p>

            <p className="text-white font-semibold">
              {complaint.id}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Department
            </p>

            <p className="text-white font-semibold">
              {complaint.department}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Priority
            </p>

            <span className="bg-red-600 text-white px-3 py-1 rounded-full">
              {complaint.priority}
            </span>

          </div>

          <div>

            <p className="text-gray-400">
              Date Submitted
            </p>

            <p className="text-white">
              {complaint.date}
            </p>

          </div>

        </div>

      </div>

      {/* Complaint Image */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Complaint Image
        </h2>

        <img
          src="https://via.placeholder.com/900x400"
          alt="Complaint"
          className="w-full rounded-xl"
        />

      </div>

      {/* Description */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Description
        </h2>

        <p className="text-gray-300 leading-8">
          {complaint.description}
        </p>

      </div>

      {/* Citizen Information */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Citizen Details
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <p className="text-gray-400">
              Name
            </p>

            <p className="text-white">
              {complaint.citizenName}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Email
            </p>

            <p className="text-white">
              {complaint.citizenEmail}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Phone
            </p>

            <p className="text-white">
              {complaint.citizenPhone}
            </p>

          </div>

        </div>

      </div>

      {/* Location */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Complaint Location
        </h2>

        <p className="text-gray-300 mb-4">
          {complaint.location}
        </p>

        <div className="h-80 rounded-xl bg-slate-800 flex items-center justify-center text-gray-400">

          Google Map Integration Here

        </div>

      </div>

      {/* Assigned Officer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Assigned Officer
        </h2>

        <p className="text-cyan-400 text-lg">
          {complaint.assignedOfficer}
        </p>

      </div>

      {/* Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Administrative Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white">
            Resolve Complaint
          </button>

          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white">
            Escalate Complaint
          </button>

          <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white">
            Reassign Officer
          </button>

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Complaint Timeline
        </h2>

        <div className="space-y-6">

          <div className="border-l-4 border-cyan-500 pl-4">

            <p className="text-white font-semibold">
              Complaint Submitted
            </p>

            <p className="text-gray-400">
              14 June 2026 - 09:20 AM
            </p>

          </div>

          <div className="border-l-4 border-yellow-500 pl-4">

            <p className="text-white font-semibold">
              Assigned to Officer
            </p>

            <p className="text-gray-400">
              14 June 2026 - 10:00 AM
            </p>

          </div>

          <div className="border-l-4 border-red-500 pl-4">

            <p className="text-white font-semibold">
              Pending Review
            </p>

            <p className="text-gray-400">
              Current Status
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;