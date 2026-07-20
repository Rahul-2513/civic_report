import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  clearStoredUser,
  saveStoredUser,
} from "../../utils/userSession";

function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userMeta, setUserMeta] = useState({
    role: "",
    createdAt: "",
    lastLogin: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: true,
    twoFactorEnabled: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/me");
        const user = res.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
        });
        setUserMeta({
          role: user.role || "",
          createdAt: user.createdAt || "",
          lastLogin: user.lastLogin || "",
        });

        setSettings({
          emailNotifications:
            user.settings.emailNotifications,
          smsNotifications:
            user.settings.smsNotifications,
          darkMode: user.settings.darkMode,
          twoFactorEnabled:
            user.settings.twoFactorEnabled,
        });
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to load settings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleToggle = (field) => {
    setSettings((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);

      const res = await api.put("/auth/me", {
        ...formData,
        settings,
      });

      saveStoredUser(res.data.user);
      alert("Settings updated successfully");
    } catch (error) {
      alert(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password changed successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Password change failed"
      );
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearStoredUser();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Settings ⚙
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          Manage your account preferences, notifications and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 h-fit">
          <h2 className="text-2xl font-bold text-white">
            Account Summary
          </h2>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-slate-950 border border-slate-700 p-5">
              <p className="text-sm font-medium text-cyan-400">
                Role
              </p>
              <p className="mt-2 text-lg font-semibold text-white capitalize">
                {userMeta.role}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-700 p-5">
              <p className="text-sm font-medium text-gray-400">
                Joined On
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {userMeta.createdAt
                  ? new Date(userMeta.createdAt).toLocaleDateString(
                      "en-IN"
                    )
                  : "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-700 p-5">
              <p className="text-sm font-medium text-gray-400">
                Last Login
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {userMeta.lastLogin
                  ? new Date(userMeta.lastLogin).toLocaleString(
                      "en-IN"
                    )
                  : "No login activity available"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-700 p-5">
              <p className="text-sm font-medium text-cyan-400">
                Notification Channels
              </p>
              <p className="mt-2 text-sm text-gray-300">
                Email: {settings.emailNotifications ? "On" : "Off"}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                SMS: {settings.smsNotifications ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Account Information
                </h2>

                <p className="text-gray-400 mt-2">
                  Update your personal details
                </p>
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 text-white px-6 py-3 rounded-2xl font-semibold transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Address
                </label>

                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <h2 className="text-3xl font-bold text-white">
              Notification Preferences 🔔
            </h2>

            <p className="text-gray-400 mt-2">
              Manage how you receive updates
            </p>

            <div className="space-y-6 mt-10">
              <div className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-2xl p-5">
                <div>
                  <h3 className="text-lg font-semibold">
                    Email Notifications
                  </h3>
                    <p className="text-gray-400 text-sm mt-1">
                    Receive complaint updates by email
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleToggle("emailNotifications")
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    settings.emailNotifications
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {settings.emailNotifications
                    ? "Enabled"
                    : "Disabled"}
                </button>
              </div>

              <div className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-2xl p-5">
                <div>
                  <h3 className="text-lg font-semibold">
                    SMS Alerts
                  </h3>
                    <p className="text-gray-400 text-sm mt-1">
                    Receive important SMS alerts
                  </p>
                </div>

                <button
                  onClick={() => handleToggle("smsNotifications")}
                  className={`px-4 py-2 rounded-lg text-white ${
                    settings.smsNotifications
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {settings.smsNotifications
                    ? "Enabled"
                    : "Disabled"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <h2 className="text-3xl font-bold text-white">
              Appearance 🎨
            </h2>

            <p className="text-gray-400 mt-2">
              Customize application appearance
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-2xl p-5">
                <div>
                  <h3 className="text-lg font-semibold">
                    Dark Mode
                  </h3>
                    <p className="text-gray-400 text-sm mt-1">
                    Enable dark theme for better experience
                  </p>
                </div>

                <button
                  onClick={() => handleToggle("darkMode")}
                  className={`px-4 py-2 rounded-lg text-white ${
                    settings.darkMode
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {settings.darkMode ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-2xl p-5">
                <div>
                  <h3 className="text-lg font-semibold">
                    Two Factor Authentication
                  </h3>
                    <p className="text-gray-400 text-sm mt-1">
                    Add extra protection to your account
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleToggle("twoFactorEnabled")
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    settings.twoFactorEnabled
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {settings.twoFactorEnabled
                    ? "Enabled"
                    : "Disabled"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <h2 className="text-3xl font-bold text-white">
              Security 🔐
            </h2>

            <p className="text-gray-400 mt-2">
              Protect your account and privacy
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Current Password"
                className="border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                placeholder="New Password"
                className="border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm Password"
                className="border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <button
                onClick={handleChangePassword}
                className="bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-red-800 p-8">
            <h2 className="text-3xl font-bold text-red-500">
              Session Actions ⚠
            </h2>

            <p className="text-gray-400 mt-2">
              Manage your current account session safely
            </p>

            <div className="flex gap-6 mt-10">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
              >
                End Session
              </button>

              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="border border-slate-700 text-gray-300 hover:bg-slate-800 px-8 py-4 rounded-2xl font-semibold transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
