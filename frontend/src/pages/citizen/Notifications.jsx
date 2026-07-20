import { useEffect, useState } from "react";
import api from "../../services/api";

const typeStyles = {
  "Complaint Assigned": {
    card: "border-blue-500 bg-blue-50",
    icon: "📌",
  },
  "Complaint Resolved": {
    card: "border-green-500 bg-green-50",
    icon: "✅",
  },
  "Complaint Updated": {
    card: "border-orange-500 bg-orange-50",
    icon: "🚧",
  },
  "Complaint Escalated": {
    card: "border-red-500 bg-red-50",
    icon: "🚨",
  },
  "Admin Announcement": {
    card: "border-purple-500 bg-purple-50",
    icon: "📢",
  },
  System: {
    card: "border-cyan-500 bg-cyan-50",
    icon: "💬",
  },
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications/me");
      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.error("Failed to load notifications:", error);
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

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;
  const resolvedUpdates = notifications.filter(
    (item) => item.type === "Complaint Resolved"
  ).length;
  const officerMessages = notifications.filter(
    (item) =>
      item.type === "Complaint Updated" ||
      item.type === "Complaint Assigned" ||
      item.type === "System"
  ).length;

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/me/${id}/read`);
      setNotifications((current) =>
        current.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: true,
                readAt: new Date().toISOString(),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update notification."
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setMarkingAll(true);
      await api.put("/notifications/me/read-all");
      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          isRead: true,
          readAt: item.readAt || new Date().toISOString(),
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update notifications."
      );
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <div className="p-2">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold">
              Notifications 🔔
            </h1>

            <p className="mt-3 text-lg text-blue-100">
              Stay updated with your complaint activities and officer responses.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl">
            <h2 className="text-3xl font-bold">
              {unreadCount}
            </h2>

            <p className="text-blue-100">
              Unread Alerts
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Total Notifications
          </p>

          <h1 className="text-4xl font-bold text-blue-600 mt-4">
            {notifications.length}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Unread
          </p>

          <h1 className="text-4xl font-bold text-orange-500 mt-4">
            {unreadCount}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Resolved Updates
          </p>

          <h1 className="text-4xl font-bold text-green-500 mt-4">
            {resolvedUpdates}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500 text-lg">
            Officer Messages
          </p>

          <h1 className="text-4xl font-bold text-cyan-500 mt-4">
            {officerMessages}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Recent Notifications
            </h2>

            <p className="text-gray-500 mt-2">
              Latest updates regarding your complaints
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={markingAll || unreadCount === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-2xl font-semibold transition"
          >
            {markingAll ? "Updating..." : "Mark All Read"}
          </button>
        </div>

        <div className="space-y-6 mt-10">
          {loading ? (
            <div className="rounded-3xl border border-slate-200 p-8 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 p-8 text-center text-gray-500">
              No notifications yet.
            </div>
          ) : (
            notifications.map((item) => {
              const style =
                typeStyles[item.type] || typeStyles.System;

              return (
                <div
                  key={item._id}
                  className={`p-6 rounded-3xl shadow-sm border-l-4 flex items-start justify-between gap-4 transition hover:shadow-lg ${style.card}`}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center text-3xl">
                      {style.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h3>

                        {!item.isRead && (
                          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mt-3 leading-relaxed">
                        {item.message}
                      </p>

                      <p className="text-sm text-gray-400 mt-4">
                        {new Date(item.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {!item.isRead ? (
                      <>
                        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse mt-2"></div>
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(item._id)}
                          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
                        >
                          Mark Read
                        </button>
                      </>
                    ) : (
                      <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-green-600 shadow-sm">
                        Read
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-800">
            Complaint Resolution Rate 📈
          </h3>

          <p className="text-gray-500 mt-3">
            {notifications.length > 0
              ? `${resolvedUpdates} resolved update(s) received so far.`
              : "Resolved complaint updates will appear here."}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-800">
            Unread Alerts ⏱
          </h3>

          <p className="text-gray-500 mt-3">
            {unreadCount > 0
              ? `You currently have ${unreadCount} unread notification(s).`
              : "All your notifications are up to date."}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-xl font-bold text-gray-800">
            Complaint Updates 🚧
          </h3>

          <p className="text-gray-500 mt-3">
            {officerMessages > 0
              ? `${officerMessages} complaint-related update(s) received from the system and officers.`
              : "Officer responses and complaint updates will show here."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
