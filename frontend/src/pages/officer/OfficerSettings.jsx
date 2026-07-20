import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  clearStoredUser,
  saveStoredUser,
} from "../../utils/userSession";

function OfficerSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [officerMeta, setOfficerMeta] = useState({
    role: "",
    employeeId: "",
    department: "",
    post: "",
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

        setOfficerMeta({
          role: user.role || "",
          employeeId: user.employeeId || "",
          department: user.department || "",
          post: user.post || "",
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
            "Failed to load officer settings."
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
      alert("Officer settings updated successfully");
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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xl">
        Loading officer settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Officer Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your profile, notifications and security settings.
        </p>
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="bg-slate-900 rounded-2xl p-6 h-fit space-y-4">
          <h2 className="text-2xl font-bold">
            Officer Summary
          </h2>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">
              Role
            </p>
            <p className="mt-2 text-lg font-semibold capitalize">
              {officerMeta.role}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">
              Employee ID
            </p>
            <p className="mt-2 text-lg font-semibold">
              {officerMeta.employeeId || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">
              Department
            </p>
            <p className="mt-2 text-lg font-semibold">
              {officerMeta.department || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">
              Designation
            </p>
            <p className="mt-2 text-lg font-semibold">
              {officerMeta.post || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">
              Joined On
            </p>
            <p className="mt-2 text-lg font-semibold">
              {officerMeta.createdAt
                ? new Date(
                    officerMeta.createdAt
                  ).toLocaleDateString("en-IN")
                : "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">
              Last Login
            </p>
            <p className="mt-2 text-lg font-semibold">
              {officerMeta.lastLogin
                ? new Date(
                    officerMeta.lastLogin
                  ).toLocaleString("en-IN")
                : "No login activity available"}
            </p>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-8">
          <div className="bg-slate-900 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold">
                  Account Information
                </h2>
                <p className="text-gray-400 mt-2">
                  Update your personal contact details.
                </p>
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900 px-5 py-3 rounded-xl font-semibold"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block mb-2 text-gray-400">
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
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
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">
                Notification Settings
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">
                  <div>
                    <p className="font-semibold">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Receive complaint updates by email
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleToggle("emailNotifications")
                    }
                    className={`px-4 py-2 rounded-lg ${
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

                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">
                  <div>
                    <p className="font-semibold">
                      SMS Notifications
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Receive important status alerts
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleToggle("smsNotifications")
                    }
                    className={`px-4 py-2 rounded-lg ${
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

            <div className="bg-slate-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">
                Appearance & Security
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">
                  <div>
                    <p className="font-semibold">
                      Dark Mode
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Store your preferred theme mode
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggle("darkMode")}
                    className={`px-4 py-2 rounded-lg ${
                      settings.darkMode
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {settings.darkMode ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4">
                  <div>
                    <p className="font-semibold">
                      Two Factor Authentication
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Save your account protection preference
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleToggle("twoFactorEnabled")
                    }
                    className={`px-4 py-2 rounded-lg ${
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
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">
              Change Password
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block mb-2 text-gray-400">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleChangePassword}
                className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl font-semibold"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerSettings;
