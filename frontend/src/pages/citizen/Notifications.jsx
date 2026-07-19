function Notifications() {

  const notifications = [

    {
      title: "Complaint Assigned",
      message:
        "Your garbage complaint has been assigned to Nagar Nigam officer.",
      time: "2 hours ago",
      type: "info",
      icon: "📌",
    },

    {
      title: "Complaint Resolved",
      message:
        "Your railway platform complaint has been resolved successfully.",
      time: "Yesterday",
      type: "success",
      icon: "✅",
    },

    {
      title: "Work In Progress",
      message:
        "Maintenance team has started work on your drainage complaint.",
      time: "30 minutes ago",
      type: "progress",
      icon: "🚧",
    },

    {
      title: "Officer Response",
      message:
        "Officer has responded to your street light complaint.",
      time: "10 minutes ago",
      type: "message",
      icon: "💬",
    },

    {
      title: "Complaint Rejected",
      message:
        "Your complaint has been rejected due to insufficient details.",
      time: "1 day ago",
      type: "danger",
      icon: "❌",
    },

  ];

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">

              Notifications 🔔

            </h1>

            <p className="mt-3 text-lg text-blue-100">

              Stay updated with your complaint activities and officer responses.

            </p>

          </div>

          {/* Notification Count */}

          <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl">

            <h2 className="text-3xl font-bold">

              {notifications.length}

            </h2>

            <p className="text-blue-100">

              New Alerts

            </p>

          </div>

        </div>

      </div>

      {/* Top Stats */}

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Total Notifications

          </p>

          <h1 className="text-4xl font-bold text-blue-600 mt-4">

            25

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Unread

          </p>

          <h1 className="text-4xl font-bold text-orange-500 mt-4">

            5

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Resolved Updates

          </p>

          <h1 className="text-4xl font-bold text-green-500 mt-4">

            12

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Officer Messages

          </p>

          <h1 className="text-4xl font-bold text-cyan-500 mt-4">

            8

          </h1>

        </div>

      </div>

      {/* Notifications List */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">

              Recent Notifications

            </h2>

            <p className="text-gray-500 mt-2">

              Latest updates regarding your complaints

            </p>

          </div>

          {/* Mark Read */}

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition">

            Mark All Read

          </button>

        </div>

        {/* Notification Cards */}

        <div className="space-y-6 mt-10">

          {notifications.map((item, index) => (

            <div
              key={index}
              className={`p-6 rounded-3xl shadow-sm border-l-4 flex items-start justify-between transition hover:shadow-lg ${
                item.type === "success"
                  ? "border-green-500 bg-green-50"
                  : item.type === "danger"
                  ? "border-red-500 bg-red-50"
                  : item.type === "progress"
                  ? "border-blue-500 bg-blue-50"
                  : item.type === "message"
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-orange-500 bg-orange-50"
              }`}
            >

              <div className="flex items-start gap-5">

                {/* Icon */}

                <div className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center text-3xl">

                  {item.icon}

                </div>

                {/* Content */}

                <div>

                  <h3 className="text-xl font-bold text-gray-800">

                    {item.title}

                  </h3>

                  <p className="text-gray-600 mt-3 leading-relaxed">

                    {item.message}

                  </p>

                  <p className="text-sm text-gray-400 mt-4">

                    {item.time}

                  </p>

                </div>

              </div>

              {/* Status Dot */}

              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse mt-2"></div>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom Activity */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-green-500">

          <h3 className="text-xl font-bold text-gray-800">

            Complaint Resolution Rate 📈

          </h3>

          <p className="text-gray-500 mt-3">

            85% of your complaints have been resolved successfully.

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-blue-500">

          <h3 className="text-xl font-bold text-gray-800">

            Average Response Time ⏱

          </h3>

          <p className="text-gray-500 mt-3">

            Officers usually respond within 4 hours.

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-orange-500">

          <h3 className="text-xl font-bold text-gray-800">

            Active Complaints 🚧

          </h3>

          <p className="text-gray-500 mt-3">

            You currently have 3 active complaints under progress.

          </p>

        </div>

      </div>

    </div>
  );
}

export default Notifications;