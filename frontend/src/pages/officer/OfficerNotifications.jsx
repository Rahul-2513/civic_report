
import { useState } from "react";

function OfficerNotifications() {

  const [notifications] = useState([
    {
      id: 1,
      type: "New Complaint",
      title: "New Complaint Assigned",
      message:
        "Complaint CMP1023 has been assigned to you.",
      time: "5 minutes ago",
      status: "Unread",
    },
    {
      id: 2,
      type: "Escalation",
      title: "Escalation Request Received",
      message:
        "Complaint CMP1045 requires higher authority review.",
      time: "20 minutes ago",
      status: "Unread",
    },
    {
      id: 3,
      type: "Resolved",
      title: "Complaint Successfully Resolved",
      message:
        "Complaint CMP1010 has been marked as resolved.",
      time: "1 hour ago",
      status: "Read",
    },
    {
      id: 4,
      type: "System",
      title: "System Update",
      message:
        "New complaint tracking features have been added.",
      time: "Yesterday",
      status: "Read",
    },
  ]);

  const unreadCount =
    notifications.filter(
      (item) => item.status === "Unread"
    ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-400 mt-2">
            Stay updated with complaint activities
          </p>

        </div>

        <div className="bg-cyan-600 px-5 py-3 rounded-xl font-semibold">

          Unread: {unreadCount}

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Notifications
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {notifications.length}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Unread
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {unreadCount}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Read
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {notifications.length - unreadCount}
          </h2>

        </div>

      </div>

      {/* Notifications List */}
      <div className="space-y-5">

        {notifications.map((item) => (

          <div
            key={item.id}
            className={`rounded-2xl p-6 border ${
              item.status === "Unread"
                ? "bg-slate-900 border-cyan-600"
                : "bg-slate-900 border-slate-800"
            }`}
          >

            <div className="flex justify-between items-start">

              <div>

                <div className="flex gap-3 items-center">

                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "Unread"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <p className="text-gray-400 mt-2">
                  {item.message}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  {item.time}
                </p>

              </div>

              <div className="flex gap-3">

                <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg">
                  View
                </button>

                {item.status === "Unread" && (

                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                    Mark Read
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default OfficerNotifications;

