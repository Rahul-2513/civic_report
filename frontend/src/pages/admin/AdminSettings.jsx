import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminSettings() {

  
const [loading, setLoading] = useState(true);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  profileImage: "",
});

const [settings, setSettings] = useState({
  emailNotifications: true,
  smsNotifications: false,
  darkMode: true,
  complaintAutoAssign: true,
  twoFactorEnabled: false,
});


const fetchSettings = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const admin = res.data.admin;

    setFormData({
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      address: admin.address || "",
      profileImage: admin.profileImage || "",
    });

    setSettings({
      emailNotifications:
        admin.settings?.emailNotifications ?? true,

      smsNotifications:
        admin.settings?.smsNotifications ?? false,

      darkMode:
        admin.settings?.darkMode ?? true,

      complaintAutoAssign:
        admin.settings?.complaintAutoAssign ?? true,

      twoFactorEnabled:
        admin.settings?.twoFactorEnabled ?? false,
    });

  } catch (err) {
    alert(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchSettings();
}, []);

  const handleToggle = (field) => {
    setSettings({
      ...settings,
      [field]: !settings[field],
    });
  };

  const handleSaveSettings = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/admin/profile",
      {
        ...formData,
        settings,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    fetchSettings();

  } catch (err) {
    alert(err.response?.data?.message || "Update Failed");
  }
};

  if (loading) {
  return (
    <div className="flex justify-center items-center h-96 text-white text-xl">
      Loading Settings...
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>

        <h1 className="text-4xl font-bold text-white">
          Admin Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Configure system preferences and administrator settings.
        </p>

      </div>

      {/* Account Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Account Settings
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-gray-300 mb-2">
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
  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
/>
          </div>

          <div>
           
           
           
 <label className="block text-gray-300 mb-2">
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
  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
/>
          </div>
  <div>
    <label className="block text-gray-300 mb-2">
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
      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
    />
  </div>

  {/* Address */}
  <div>
    <label className="block text-gray-300 mb-2">
      Address
    </label>

    <textarea
      value={formData.address}
      onChange={(e) =>
        setFormData({
          ...formData,
          address: e.target.value,
        })
      }
      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
    />
  </div>

</div>        

 </div>

      {/* Notification Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Notification Settings
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between items-center">

            <span className="text-gray-300">
              Email Notifications
            </span>

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

          <div className="flex justify-between items-center">

            <span className="text-gray-300">
              SMS Notifications
            </span>

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

      {/* System Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          System Settings
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between items-center">

            <span className="text-gray-300">
              Dark Mode
            </span>

            <button
              onClick={() =>
                handleToggle("darkMode")
              }
              className={`px-4 py-2 rounded-lg ${
                settings.darkMode
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {settings.darkMode
                ? "Enabled"
                : "Disabled"}
            </button>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-300">
              Auto Assign Complaints
            </span>

            <button
              onClick={() =>
                handleToggle("complaintAutoAssign")
              }
              className={`px-4 py-2 rounded-lg ${
                settings.complaintAutoAssign
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {settings.complaintAutoAssign
                ? "Enabled"
                : "Disabled"}
            </button>

          </div>

        </div>

      </div>

      {/* Security */}
<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

  <h2 className="text-2xl font-semibold text-white mb-6">
    Security Settings
  </h2>

  <div className="flex flex-wrap gap-4">

    <Link
      to="/change-password"
      className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-xl text-white"
    >
      Change Password
    </Link>

    <button
  onClick={() => handleToggle("twoFactorEnabled")}
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

    <button className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white">
      Logout All Devices
    </button>

  </div>

</div>
      {/* Save Button */}
      <div>

<button
  onClick={handleSaveSettings}
  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white font-semibold"
>
  Save Settings
</button>

      </div>

    </div>
  );
}

export default AdminSettings;
