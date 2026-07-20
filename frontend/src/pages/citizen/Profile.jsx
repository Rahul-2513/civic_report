import { useEffect, useState } from "react";
import api from "../../services/api";
import { saveStoredUser } from "../../utils/userSession";


function Profile() {

const [user, setUser] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  resolved: 0,
  rejected: 0,
});

const [activities, setActivities] = useState([]);

const [loading, setLoading] = useState(true);
const [uploadingImage, setUploadingImage] = useState(false);
  

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [profileRes, statsRes, complaintsRes] =
      await Promise.all([
        api.get("/auth/me", {
          headers,
        }),
        api.get("/complaints/dashboard", {
          headers,
        }),
        api.get("/complaints/my-complaints", {
          headers,
        }),
      ]);

    setUser(profileRes.data.user);
    saveStoredUser(profileRes.data.user);
    setStats(statsRes.data.stats);
    setActivities(complaintsRes.data.complaints);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await api.put(
      "/auth/me",
      {
        name: user.name,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    setUser(data.user);
    saveStoredUser(data.user);
    setIsEditing(false);

    alert("Profile Updated Successfully");

  } catch (err) {
    console.error(err);
    alert("Update Failed");
  }
};

const handleProfileImageUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  try {
    setUploadingImage(true);

    const formData = new FormData();
    formData.append("profileImage", file);

    const { data } = await api.post(
      "/auth/me/profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUser(data.user);
    saveStoredUser(data.user);
    alert("Profile image updated successfully");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Image upload failed");
  } finally {
    setUploadingImage(false);
    event.target.value = "";
  }
};
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading...
    </div>
  );
}

if (!user) return null;

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">

              My Profile 👤

            </h1>

            <p className="mt-3 text-lg text-blue-100">

              Manage your personal information and complaint activities.

            </p>

          </div>

<button
  onClick={() => setIsEditing(!isEditing)}
  className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition"
>
  {isEditing ? "Cancel" : "Edit Profile"}
</button>

        </div>

      </div>

      {/* Top Section */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        {/* Left Profile Card */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex flex-col items-center text-center">

            {/* Profile Image */}
            {user.profileImage ? (
              <img src={user.profileImage}
                alt={user.name}
                className="w-40 h-40 rounded-full border-4 border-cyan-500 shadow-lg object-cover"
              />
            ) : (
              <div className="w-40 h-40 rounded-full border-4 border-cyan-500 shadow-lg bg-cyan-100 text-cyan-700 flex items-center justify-center text-5xl font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <label className="mt-5 inline-flex cursor-pointer items-center rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
              {uploadingImage ? "Uploading..." : "Upload My Picture"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleProfileImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>

            <h2 className="text-3xl font-bold text-gray-800 mt-6">

              {user.name}

            </h2>

            <p className="text-cyan-600 font-semibold text-lg mt-2">

              {user.role}

            </p>

            {/* Status */}

            <div className="bg-green-100 text-green-600 px-5 py-2 rounded-full mt-5 font-medium">

              Active User

            </div>

          </div>

          {/* Quick Info */}

          <div className="space-y-5 mt-10">

            <div className="flex items-center justify-between">

              <p className="text-gray-500">

                Email

              </p>

              <h3 className="font-semibold text-gray-800">

                {user.email}

              </h3>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-500">

                Phone

              </p>

              <h3 className="font-semibold text-gray-800">

                {user.phone}

              </h3>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-500">

                City

              </p>

              <h3 className="font-semibold text-gray-800">

                {user.address}

              </h3>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-500">

                Joined

              </p>

              <h3 className="font-semibold text-gray-800">

                {new Date(user.createdAt).toLocaleDateString("en-IN")}

              </h3>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="col-span-2 space-y-8">

          {/* Statistics */}

          <div className="grid grid-cols-4 gap-6">

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <p className="text-gray-500 text-lg">

                Total Complaints

              </p>

              <h1 className="text-4xl font-bold text-blue-600 mt-4">

                {stats.total}

              </h1>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <p className="text-gray-500 text-lg">

                Resolved

              </p>

              <h1 className="text-4xl font-bold text-green-500 mt-4">

                {stats.resolved}

              </h1>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <p className="text-gray-500 text-lg">

                Pending

              </p>

              <h1 className="text-4xl font-bold text-orange-500 mt-4">

                {stats.pending}

              </h1>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <p className="text-gray-500 text-lg">

                Rejected

              </p>

              <h1 className="text-4xl font-bold text-red-500 mt-4">

                {stats.rejected}

              </h1>

            </div>

          </div>

          {/* Personal Information */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">

                  Personal Information

                </h2>

                <p className="text-gray-500 mt-2">

                  Your account details and contact information

                </p>

              </div>

              {isEditing && (
<button
    onClick={updateProfile}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
>
    Save Changes
</button>
)}

            </div>

            {/* Form */}

            <div className="grid grid-cols-2 gap-6 mt-10">

              {/* Full Name */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Full Name

                </label>

                <input
    type="text"
    value={user.name}
    disabled={!isEditing}
    onChange={(e)=>
        setUser({
            ...user,
            name:e.target.value
        })
    }
    className={`w-full border rounded-2xl px-5 py-4 outline-none
    ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
/>

              </div>

              {/* Email */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Email Address

                </label>

                <input
                 type="email"
                 value={user.email}
                 readOnly
                  />               

              </div>

              {/* Phone */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Phone Number

                </label>

                <input
    type="text"
    value={user.phone}
    disabled={!isEditing}
    onChange={(e)=>
        setUser({
            ...user,
            phone:e.target.value
        })
    }
    className={`w-full border rounded-2xl px-5 py-4
    ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
/>
              </div>

              {/* City */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Address

                </label>

                <input
    type="text"
    value={user.address}
    disabled={!isEditing}
    onChange={(e)=>
        setUser({
            ...user,
            address:e.target.value
        })
    }
    className={`w-full border rounded-2xl px-5 py-4
    ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
/>

              </div>

            </div>

          </div>

          {/* Activity Section */}

          <div className="grid grid-cols-2 gap-6">

            {/* Recent Activity */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-8">

                Recent Activity 🔔

              </h2>

              <div className="space-y-6">

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">

                    ✔

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Complaint Resolved

                    </h3>

                    <p className="text-gray-500 text-sm mt-1">

                      Railway complaint resolved successfully.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">

                    📌

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      New Complaint Submitted

                    </h3>

                    <p className="text-gray-500 text-sm mt-1">

                      Garbage issue reported.

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Account Security */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-8">

                Account Security 🔐

              </h2>

              <div className="space-y-5">

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition">

                  Change Password

                </button>

                <button className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-4 rounded-2xl font-semibold transition">

                  Delete Account

                </button>

                <button className="w-full border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-semibold transition">

                  Logout

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;

