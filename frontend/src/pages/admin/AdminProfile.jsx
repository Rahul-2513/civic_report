import { useEffect, useState } from "react";
import axios from "axios";
function AdminProfile() {

const [admin, setAdmin] = useState(null);
const [loading, setLoading] = useState(true);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [showModal, setShowModal] = useState(false);
const [showPasswordModal, setShowPasswordModal] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  address: "",
  profileImage: "",
});


const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

  const fetchAdminProfile = async () => {
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

    console.log("Profile Response:", res.data);

    setAdmin(res.data.admin);

  } catch (err) {
    console.error("Full Error:", err);
    console.error("Response:", err.response);
    console.error("Data:", err.response?.data);

    alert(err.response?.data?.message || err.message);

  } finally {
    setLoading(false);
  }
};
 const handleUpdateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/admin/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    setShowModal(false);

    fetchAdminProfile();

  } catch (err) {
    alert(err.response?.data?.message || "Update Failed");
  }
};

const handleChangePassword = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    return alert("New Password and Confirm Password do not match.");
  }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/admin/change-password",
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    setShowPasswordModal(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (err) {
    alert(err.response?.data?.message || "Password change failed");
  }
};
  

useEffect(() => {
  fetchAdminProfile();
}, []);

if (loading) {
  return (
    <div className="flex justify-center items-center h-96 text-white text-xl">
      Loading Profile...
    </div>
  );
}


if (!admin) {
  return (
    <div className="flex justify-center items-center h-96 text-red-400 text-xl">
      Profile not found
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>

        <h1 className="text-4xl font-bold text-white">
          Admin Profile
        </h1>

        <p className="text-gray-400 mt-2">
          View and manage administrator information.
        </p>

      </div>

      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-cyan-600 flex items-center justify-center text-5xl font-bold text-white">

           {admin?.name?.charAt(0).toUpperCase() || "A"}

          </div>

          {/* Basic Info */}
          <div>

            <h2 className="text-3xl font-bold text-white">
  {admin?.name}
</h2>

            <p className="text-cyan-400 mt-2">
              {admin?.role}
            </p>

           <span
  className={`inline-block mt-3 px-4 py-1 rounded-full text-sm text-white ${
    admin?.isActive === true
      ? "bg-green-600"
      : admin?.isActive === false
      ? "bg-red-600"
      : "bg-gray-600"
  }`}
>
  {admin?.isActive === true
    ? "Active"
    : admin?.isActive === false
    ? "Inactive"
    : "Unknown"}
</span>

          </div>

        </div>

      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h3 className="text-xl font-semibold text-white mb-6">
            Personal Information
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-gray-400">
                Full Name
              </p>

              <p className="text-white">
                {admin?.name}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Email Address
              </p>

              <p className="text-white">
                {admin?.email}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Phone Number
              </p>

              <p className="text-white">
                {admin?.phone}
              </p>
            </div>

          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h3 className="text-xl font-semibold text-white mb-6">
            Administrative Information
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-gray-400">
                Employee ID
              </p>

              <p className="text-white">
                {admin?.employeeId}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Department
              </p>

              <p className="text-white">
                {admin?.department}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Joining Date
              </p>

              <p className="text-white">
                {admin?.createdAt
  ? new Date(admin.createdAt).toLocaleDateString()
  : "-"}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Account Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h3 className="text-xl font-semibold text-white mb-6">
          Account Actions
        </h3>

        <div className="flex flex-wrap gap-4">

 <button
  onClick={() => {
    setFormData({
      name: admin.name,
      phone: admin.phone,
      address: admin.address,
      profileImage: admin.profileImage || "",
    });

    setShowModal(true);
  }}
  className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white"
>
  Edit Profile
</button>

          
<button
  onClick={() => setShowPasswordModal(true)}
  className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-xl text-white font-semibold transition"
>
  Change Password
</button>

          
          
<button
  onClick={() => {
    setFormData({
      name: admin.name,
      phone: admin.phone,
      address: admin.address,
      profileImage: admin.profileImage || "",
    });

    setShowModal(true);
  }}
  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-500/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
>
  Update Information
</button>

        </div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-900 p-6 rounded-xl w-[450px] border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Update Profile
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        className="w-full p-3 mb-3 rounded bg-slate-800 text-white"
      />

      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        className="w-full p-3 mb-3 rounded bg-slate-800 text-white"
      />

      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) =>
          setFormData({ ...formData, address: e.target.value })
        }
        className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-600 rounded text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateProfile}
          className="px-4 py-2 bg-cyan-600 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{showPasswordModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[450px]">

      <h2 className="text-2xl font-bold text-white mb-5">
        Change Password
      </h2>

      <input
        type="password"
        placeholder="Current Password"
        value={passwordData.currentPassword}
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            currentPassword: e.target.value,
          })
        }
        className="w-full p-3 mb-3 rounded-lg bg-slate-800 text-white outline-none"
      />

      <input
        type="password"
        placeholder="New Password"
        value={passwordData.newPassword}
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            newPassword: e.target.value,
          })
        }
        className="w-full p-3 mb-3 rounded-lg bg-slate-800 text-white outline-none"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordData.confirmPassword}
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            confirmPassword: e.target.value,
          })
        }
        className="w-full p-3 mb-5 rounded-lg bg-slate-800 text-white outline-none"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowPasswordModal(false)}
          className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleChangePassword}
          className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white"
        >
          Change Password
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

export default AdminProfile;