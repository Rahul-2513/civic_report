import { Link } from "react-router-dom";

function OfficerSidebar() {

  const department =
    localStorage.getItem("department");

  const post =
    localStorage.getItem("post");

  const employeeId =
    localStorage.getItem("employeeId");

  return (

    <div className="w-72 h-screen fixed left-0 top-0 bg-slate-900 text-white border-r border-slate-800 flex flex-col overflow-y-auto">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold">
          Civic Portal
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Officer Dashboard
        </p>

      </div>

      {/* Officer Info */}
      <div className="p-6 border-b border-slate-800">

        <p className="font-semibold">
          {employeeId}
        </p>

        <p className="text-gray-400 text-sm mt-1">
          {department}
        </p>

        <p className="text-cyan-400 text-sm">
          {post}
        </p>

      </div>

      {/* Menu */}
      <div className="p-4 space-y-2 flex-1">

        <Link
          to="/officer/dashboard"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/officer/complaints"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          📋 Assigned Complaints
        </Link>

        <Link
          to="/officer/tracking"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🔍 Complaint Tracking
        </Link>

        <Link
          to="/officer/escalation"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🚨 Escalation Requests
        </Link>

        <Link
          to="/officer/reports"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          📊 Reports & Analytics
        </Link>

        <Link
          to="/officer/performance"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          👥 Officer Performance
        </Link>

        <Link
          to="/officer/feedback"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          ⭐ Citizen Feedback
        </Link>

        <Link
          to="/officer/notifications"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🔔 Notifications
        </Link>

        <Link
          to="/officer/profile"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          👤 Profile
        </Link>

        <Link
          to="/officer/settings"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          ⚙ Settings
        </Link>

      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">

        <button
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl"
          onClick={() => {

            localStorage.clear();

            window.location.href = "/login";

          }}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default OfficerSidebar;