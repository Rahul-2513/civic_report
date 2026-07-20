
import { useState, useEffect } from "react";
import api from "../../services/api";

function AdminNotifications() {

const [notifications, setNotifications] = useState([]);
const [loading, setLoading] = useState(true);

const fetchNotifications = async () => {

  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await api.get(
      "/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications(res.data.notifications);

  } catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    "Failed to load notifications."
  );
} finally {

    setLoading(false);

  }

};

useEffect(() => {
  fetchNotifications();
}, []);

  const getBadgeColor = (type) => {

  switch (type) {

    case "Complaint Assigned":
      return "bg-cyan-600";

    case "Complaint Updated":
      return "bg-green-600";

    case "Complaint Escalated":
      return "bg-red-600";

    case "Complaint Resolved":
      return "bg-emerald-600";

    case "Admin Announcement":
      return "bg-yellow-600";

    case "System":
      return "bg-purple-600";

    default:
      return "bg-slate-600";
  }
};

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>

        <h1 className="text-4xl font-bold text-white">
          Notifications
        </h1>

        <p className="text-gray-400 mt-2">
          System alerts, complaint updates and admin activities.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Notifications
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
           {notifications.length}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Unread Notifications
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            {
            notifications.filter(
              (item) => !item.isRead
               ).length
              }
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Today's Alerts
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-3">
            {
                  notifications.filter((item) => {

                     const today = new Date();

                   const created = new Date(item.createdAt);

                         return (
                        created.toDateString() ===
                         today.toDateString()
                          );

                        }).length
                          }
          </h2>

        </div>

      </div>

      {/* Notifications List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Recent Notifications
          </h2>

        </div>
<div className="divide-y divide-slate-800">

  {loading ? (

    <div className="p-8 text-center text-white">
      Loading Notifications...
    </div>

  ) : notifications.length === 0 ? (

    <div className="p-8 text-center text-gray-400">
      No Notifications Found
    </div>

  ) : (

    notifications.map((item) => (

      <div
        key={item._id}
        className="p-6 hover:bg-slate-800/40 transition"
      >

        <div className="flex justify-between items-start">

          <div>

            <div className="flex items-center gap-3">

              <span
                className={`px-3 py-1 rounded-full text-xs text-white ${getBadgeColor(item.type)}`}
              >
                {item.type}
              </span>

              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

            </div>

            <p className="text-gray-400 mt-2">
              {item.message}
            </p>

          </div>

          <span className="text-sm text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </span>

        </div>

      </div>

    ))

  )}

      </div>

    </div>
    </div>
  );

}

export default AdminNotifications;

