import {Link} from "react-router-dom";

function AdminSidebar() {
  return (
    <div className= "w-72 min-h-screen bg-slate-900 text-white border-r border-slate-800 flex flex-col">
      <div className ="p-6 border-b border-slate-800">
        <h1 className ="text-2xl font-bold">
          Civic Portal
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>
      <div className="p-6 border-b border-slate-800">
        <p className="font-semibold text-lg">
          Super Admin
        </p>
        <p className="text-gray-400 text-sm">
           admin@civic.gov.in
        </p>
        <p className="text-cyan-400 text-sm">
          System Adminstrator
        </p>
      </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      <Link to="/admin/dashboard"
      className="block px-4 py-3 rounded-xl hover:bg-slate-800"
      > 🏠Dashboard</Link>
      <Link
          to="/admin/officers"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          👥 Manage Officers
        </Link>
         <Link
          to="/admin/citizens"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          👤 Manage Citizens
        </Link>
         <Link
          to="/admin/departments"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🏢 Departments
        </Link>
          <Link
          to="/admin/complaints"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          📋 All Complaints
        </Link>
         <Link
          to="/admin/escalations"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🚨 Escalations
        </Link>
         <Link
          to="/admin/analytics"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          📊 Analytics
        </Link>

        <Link
          to="/admin/feedback"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          ⭐ Feedback
        </Link>
          <Link
          to="/admin/announcements"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          📢 Announcements
        </Link>
              <Link
          to="/admin/notifications"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          🔔 Notifications
        </Link>
        <Link
          to="/admin/auditlogs"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          📝 Audit Logs
        </Link>
           <Link
          to="/admin/profile"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          👤 Profile
        </Link>
           <Link
          to="/admin/settings"
          className="block px-4 py-3 rounded-xl hover:bg-slate-800"
        >
          ⚙ Settings
        </Link>
      </div> 
      <div className="p-4 border-t border-slate-800">
        <button onClick={()=>{
          localStorage.clear();
          window.location.href="/login"
        }}
        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-medium">
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;

