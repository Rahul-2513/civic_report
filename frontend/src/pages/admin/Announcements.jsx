import { useState, useEffect } from "react";
import axios from "axios";

function Announcements() {

const [announcements, setAnnouncements] = useState([]);
const [loading, setLoading] = useState(true);

const [title, setTitle] = useState("");
const [message, setMessage] = useState("");
const [audience, setAudience] = useState("All");
const [editingId, setEditingId] = useState(null);
const [showModal, setShowModal] = useState(false);

const fetchAnnouncements = async () => {
  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/announcements",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAnnouncements(res.data.announcements);

 } catch (error) {

  console.error(error);

  alert(
    error.response?.data?.message ||
    "Failed to load announcements."
  );

} finally {

  setLoading(false);

}
};

useEffect(() => {
  fetchAnnouncements();
}, []);

const createAnnouncement = async () => {

  if (!title || !message) {
    return alert("Please fill all fields.");
  }

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/announcements",
      {
        title,
        message,
        audience,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

alert("Announcement Created Successfully.");

setTitle("");
setMessage("");
setAudience("All");

setShowModal(false);
setEditingId(null);

fetchAnnouncements();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to create announcement."
    );

  }

};
const deleteAnnouncement = async (id) => {

  if (!window.confirm("Are you sure you want to delete this announcement?")) {
    return;
  }

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/announcements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Announcement deleted successfully.");

    fetchAnnouncements();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to delete announcement."
    );

  }
};

const toggleAnnouncementStatus = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/announcements/${id}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchAnnouncements();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to update status."
    );

  }

};


const updateAnnouncement = async () => {
  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/announcements/${editingId}`,
      {
        title,
        message,
        audience,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Announcement Updated Successfully.");

    setEditingId(null);
    setShowModal(false);
    setTitle("");
    setMessage("");
    setAudience("All");

    fetchAnnouncements();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to update announcement."
    );

  }
};


  
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Announcements
          </h1>

          <p className="text-gray-400 mt-2">
            Create and manage public announcements.
          </p>

        </div>

<button
  onClick={() => setShowModal(true)}
  className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold"
>
  + Create Announcement
</button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Announcements
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {announcements.length}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Published
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
           {
           announcements.filter(item => item.isActive).length
             }
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

           <p className="text-red-400">
             Inactive
         </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {
             announcements.filter(item => !item.isActive).length
              }
          </h2>

        </div>

      </div>

      {/* Announcements List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Recent Announcements
          </h2>

        </div>

       <div className="divide-y divide-slate-800">

  {loading ? (

    <div className="p-8 text-center text-white">
      Loading Announcements...
    </div>

  ) : announcements.length === 0 ? (

    <div className="p-8 text-center text-gray-400">
      No Announcements Found
    </div>

  ) : (

    announcements.map((item) => (

      <div
        key={item._id}
        className="p-6 hover:bg-slate-800/40 transition"
      >

        {/* Yahan tumhara existing announcement card rahega */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">

          <div>

            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {item.message}
            </p>

            <p className="text-cyan-400 text-sm mt-2">
              Audience: {item.audience}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              Published On: {new Date(item.createdAt).toLocaleDateString()}
            </p>

          </div>

          <div className="flex flex-col gap-3">

            <span
              className={`px-4 py-2 rounded-full text-sm text-center ${
                item.isActive
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {item.isActive ? "Published" : "Inactive"}
            </span>

<button
  onClick={() => toggleAnnouncementStatus(item._id)}
  className={`px-4 py-2 rounded-lg text-white ${
    item.isActive
      ? "bg-yellow-600 hover:bg-yellow-700"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {item.isActive ? "Deactivate" : "Publish"}
</button>

<button
   onClick={() => {
  setEditingId(item._id);
  setTitle(item.title);
  setMessage(item.message);
  setAudience(item.audience);
  setShowModal(true);
}}
    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white"
  >
    Edit
  </button>

<button
  onClick={() => deleteAnnouncement(item._id)}
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
>
  Delete
</button>

          </div>

        </div>

      </div>

    ))

  )}

</div>

      </div>

      {/* Quick Announcement Form */}
  
      {showModal && (
  <div
  className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  onClick={() => {
    setShowModal(false);
    setEditingId(null);
    setTitle("");
    setMessage("");
    setAudience("All");
  }}
>

<div
  className="bg-slate-900 rounded-2xl w-full max-w-xl p-6 border border-slate-700"
  onClick={(e) => e.stopPropagation()}
>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          {editingId ? "Update Announcement" : "Create Announcement"}
        </h2>

        <button
          onClick={() => {
            setShowModal(false);
            setEditingId(null);
            setTitle("");
            setMessage("");
            setAudience("All");
          }}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

      </div>

      <div className="space-y-4">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement Title"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
        />

        <textarea
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Announcement Message"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
        />

        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
        >
          <option value="All">All</option>
          <option value="Citizens">Citizens</option>
          <option value="Officers">Officers</option>
          <option value="Admins">Admins</option>
        </select>

<div className="flex justify-end gap-3">

<button
 onClick={() => {
  setShowModal(false);
  setEditingId(null);
  setTitle("");
  setMessage("");
  setAudience("All");
}}
            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={editingId ? updateAnnouncement : createAnnouncement}
            className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {editingId ? "Update" : "Publish"}
          </button>

        </div>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default Announcements;
