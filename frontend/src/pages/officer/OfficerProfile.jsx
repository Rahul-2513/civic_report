
function OfficerProfile() {

  const officer = {
    name: "Rahul Kumar",
    employeeId:
      localStorage.getItem("employeeId") || "RW101",
    department:
      localStorage.getItem("department") || "Railway",
    post:
      localStorage.getItem("post") || "Health Inspector",
    email: "rahul@civicportal.gov.in",
    phone: "+91 9876543210",
    joiningDate: "15 Jan 2024",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Officer information and performance
          </p>

        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl">
          Edit Profile
        </button>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Profile Card */}
        <div className="bg-slate-900 rounded-2xl p-8">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-cyan-600 flex items-center justify-center text-4xl font-bold">

              {officer.name.charAt(0)}

            </div>

            <h2 className="text-2xl font-bold mt-5">
              {officer.name}
            </h2>

            <p className="text-cyan-400 mt-2">
              {officer.post}
            </p>

            <p className="text-gray-400">
              {officer.department}
            </p>

          </div>

        </div>

        {/* Details */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Officer Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-400">
                Employee ID
              </p>

              <p className="font-semibold mt-1">
                {officer.employeeId}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Department
              </p>

              <p className="font-semibold mt-1">
                {officer.department}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Designation
              </p>

              <p className="font-semibold mt-1">
                {officer.post}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Email
              </p>

              <p className="font-semibold mt-1">
                {officer.email}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Phone
              </p>

              <p className="font-semibold mt-1">
                {officer.phone}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Joining Date
              </p>

              <p className="font-semibold mt-1">
                {officer.joiningDate}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Performance Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Complaints
          </p>

          <h2 className="text-4xl font-bold mt-2">
            245
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Resolved
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            180
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            34
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Escalated
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            12
          </h2>

        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="bg-slate-800 p-4 rounded-xl">
            ✅ Resolved Complaint CMP1023
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            📋 Assigned Complaint CMP1045
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            🚨 Escalated Complaint CMP1058
          </div>

        </div>

      </div>

    </div>
  );
}

export default OfficerProfile;

