import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const typeStyles = {
  "Complaint Assigned": {
    border: "border-cyan-600",
    icon: "📌",
  },
  "Complaint Resolved": {
    border: "border-green-600",
    icon: "✅",
  },
  "Complaint Updated": {
    border: "border-yellow-600",
    icon: "🚧",
  },
  "Complaint Escalated": {
    border: "border-red-600",
    icon: "🚨",
  },
  "Admin Announcement": {
    border: "border-purple-600",
    icon: "📢",
  },
  System: {
    border: "border-slate-600",
    icon: "💬",
  },
};

function OfficerNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications/me");
      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.error("Failed to load officer notifications:", error);
      alert(
        error.response?.data?.message ||
          "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;
  const readCount = notifications.length - unreadCount;
  const complaintLinkedCount = notifications.filter(
    (item) => item.complaint
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
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-400 mt-2">
            Stay updated with complaint assignments, escalations and status changes.
          </p>
        </div>

        <div className="bg-cyan-600 px-5 py-3 rounded-xl font-semibold">
          Unread: {unreadCount}
        </div>
      </div>

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
            Complaint Linked
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {complaintLinkedCount}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold">
              Recent Notifications
            </h2>

            <p className="text-gray-400 mt-2">
              Your live notification feed
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={markingAll || unreadCount === 0}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900 disabled:text-slate-400 px-5 py-3 rounded-xl font-semibold"
          >
            {markingAll ? "Updating..." : "Mark All Read"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {loading ? (
          <div className="rounded-2xl p-8 border border-slate-800 bg-slate-900 text-center text-gray-400">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl p-8 border border-slate-800 bg-slate-900 text-center text-gray-400">
            No notifications found.
          </div>
        ) : (
          notifications.map((item) => {
            const style =
              typeStyles[item.type] || typeStyles.System;

            return (
              <div
                key={item._id}
                className={`rounded-2xl p-6 border bg-slate-900 ${
                  !item.isRead
                    ? style.border
                    : "border-slate-800"
                }`}
              >
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl">
                      {style.icon}
                    </div>

                    <div>
                      <div className="flex gap-3 items-center flex-wrap">
                        <h2 className="text-xl font-semibold">
                          {item.title}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            item.isRead
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.isRead ? "Read" : "Unread"}
                        </span>
                      </div>

                      <p className="text-gray-400 mt-2">
                        {item.message}
                      </p>

                      <p className="text-sm text-gray-500 mt-3">
                        {new Date(item.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {item.complaint && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/officer/complaint/${item.complaint._id || item.complaint}`)
                        }
                        className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
                      >
                        View
                      </button>
                    )}

                    {!item.isRead && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(item._id)}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-xl font-bold">
            Read Notifications
          </h3>

          <p className="text-gray-400 mt-3">
            {readCount} notification(s) already reviewed by you.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-xl font-bold">
            Escalation Alerts
          </h3>

          <p className="text-gray-400 mt-3">
            {
              notifications.filter(
                (item) => item.type === "Complaint Escalated"
              ).length
            } escalation-related update(s) received.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-xl font-bold">
            Assignment Alerts
          </h3>

          <p className="text-gray-400 mt-3">
            {
              notifications.filter(
                (item) => item.type === "Complaint Assigned"
              ).length
            } complaint assignment update(s) available.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfficerNotifications;
