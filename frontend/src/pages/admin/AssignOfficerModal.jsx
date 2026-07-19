import { useEffect, useState } from "react";
import axios from "axios";

function AssignOfficerModal({
  show,
  onClose,
  complaint,
  fetchComplaints,
}) {
  
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [filteredOfficers, setFilteredOfficers] = useState([]);

  useEffect(() => {
    if (show && complaint) {
      fetchOfficers();
    }
  }, [show, complaint]);

  const fetchOfficers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/officers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filtered = res.data.officers.filter(
        (officer) =>
          officer.department === complaint.department
      );

      setOfficers(filtered);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  if (!selectedPost) {
    setFilteredOfficers([]);
    return;
  }

  const filtered = officers.filter(
    (officer) => officer.post === selectedPost
  );

  setFilteredOfficers(filtered);

}, [selectedPost, officers]);

  const handleAssign = async () => {
    if (!selectedOfficer) {
      return alert("Please select an officer");
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/admin/complaints/${complaint._id}/assign`,
        {
          officerId: selectedOfficer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Assigned Successfully");

      fetchComplaints();

      onClose();

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Assignment Failed"
      );
    }
  };

  if (!show || !complaint) return null;

  const posts = [...new Set(officers.map((officer) => officer.post))];

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Assign Officer
          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div>

            <p className="text-gray-400">
              Complaint
            </p>

            <p className="text-white">
              {complaint.title}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Department
            </p>

            <p className="text-white">
              {complaint.department}
            </p>

          </div>

          <div>

  <label className="text-gray-400">
    Select Post
  </label>

  <select
    value={selectedPost}
    onChange={(e) => {
      setSelectedPost(e.target.value);
      setSelectedOfficer("");
    }}
    className="w-full mt-2 p-3 rounded bg-slate-800 text-white"
  >

    <option value="">
      Select Post
    </option>

    {posts.map((post) => (

      <option
        key={post}
        value={post}
      >
        {post}
      </option>

    ))}

  </select>

</div>

          <div>

            <label className="text-gray-400">
              Select Officer
            </label>

            <select
              value={selectedOfficer}
              onChange={(e) =>
                setSelectedOfficer(e.target.value)
              }
              className="w-full mt-2 p-3 rounded bg-slate-800 text-white"
            >
              <option value="">
                Select Officer
              </option>

              {filteredOfficers.map((officer) => (

<option
key={officer._id}
value={officer._id}
>

{officer.name} ({officer.employeeId})

</option>

))}

            </select>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-600 px-5 py-3 rounded text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className="bg-cyan-600 px-5 py-3 rounded text-white"
          >
            Assign
          </button>

        </div>

      </div>

    </div>
  );
}

export default AssignOfficerModal;
