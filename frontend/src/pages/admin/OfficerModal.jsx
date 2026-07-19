import { useEffect, useState } from "react";
import axios from "axios";

function OfficerModal({
  show,
  onClose,
  fetchOfficers,
  isEdit,
  selectedOfficer,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    department: "",
    post: "",
    phone: "",
  });

  useEffect(() => {
    if (isEdit && selectedOfficer) {
      setFormData({
        name: selectedOfficer.name || "",
        email: selectedOfficer.email || "",
        password: "",
        employeeId: selectedOfficer.employeeId || "",
        department: selectedOfficer.department || "",
        post: selectedOfficer.post || "",
        phone: selectedOfficer.phone || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        employeeId: "",
        department: "",
        post: "",
        phone: "",
      });
    }
  }, [isEdit, selectedOfficer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/admin/officers/${selectedOfficer._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Officer Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/officers",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Officer Added Successfully");
      }

      fetchOfficers();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-2xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            {isEdit ? "Edit Officer" : "Add Officer"}
          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
            required
          />

          {!isEdit && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 rounded bg-slate-800 text-white"
              required
            />
          )}

          <input
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
            required
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
            required
          >
            <option value="">Select Department</option>
            <option>Railway</option>
            <option>Gram Panchayat</option>
            <option>Nagar Nigam</option>
          </select>

          <input
            name="post"
            placeholder="Post"
            value={formData.post}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
            required
          />

          <div className="col-span-2 flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded bg-gray-600 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded bg-cyan-600 text-white"
            >
              {isEdit ? "Update Officer" : "Add Officer"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default OfficerModal;
