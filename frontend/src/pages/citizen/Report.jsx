import { useState, useEffect } from "react";
import api from "../../services/api";


function Report() {
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({

    title: "",
    department: "",
    category: "",
    location: "",
    priority: "",
    description: "",
    image: null,

  });

  /* Dynamic Categories */

  const categories = {

    Railway: [
      "Dirty Platform",
      "Train Delay",
      "Broken Seat",
      "Water Problem",
      "Unclean Toilet",
    ],

    "Nagar Nigam": [
      "Garbage Issue",
      "Street Light Problem",
      "Road Damage",
      "Drainage Issue",
      "Water Leakage",
    ],

    "Gram Panchayat": [
      "Water Supply",
      "Village Road Damage",
      "Toilet Problem",
      "Cleanliness Issue",
      "Street Light Problem",
      "Drainage Issue",
    ],

  };

  /* Live Location */

  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setFormData((prev) => ({

            ...prev,
            location: `${latitude}, ${longitude}`,

          }));
        },

        (error) => {

          console.log(error);

        }

      );
    }

  }, []);
// 👇 Add this here
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

/* Handle Image */

  const handleImage = (e) => {

    setFormData({

      ...formData,
      image: e.target.files[0],

    });
  };
  /* Handle Input */
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit button clicked");

  if (!formData.image) {
    alert("Please upload complaint image");
    return;
  }

  setSubmitting(true);

  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("department", formData.department);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("priority", formData.priority);

    data.append(
      "location",
      JSON.stringify({
        address: formData.location,
      })
    );

    data.append("image", formData.image);

    const response = await api.post(
      "/complaints/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data.message);

    console.log(response.data);

    // Optional: Form reset
    setFormData({
      title: "",
      department: "",
      category: "",
      description: "",
      priority: "Medium",
      location: "",
      image: null,
    });

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Complaint submission failed"
    );
  } finally {
    // ✅ Hamesha loading band hogi
    setSubmitting(false);
  }
};

 

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white">

        <h1 className="text-4xl font-bold">

          Report Civic Issue 🚨

        </h1>

        <p className="mt-3 text-lg text-gray-400">

          Help improve your city by reporting civic issues quickly.

        </p>

      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        {/* Form Section */}

        <div className="col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-8">

          <h2 className="text-2xl font-bold text-white mb-8">

            Complaint Details

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Complaint Title */}

            <div>

              <label className="block text-gray-300 font-semibold mb-2">

                Complaint Title

              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter complaint title"
                onChange={handleChange}
                required
                className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            {/* Department */}

            <div>

              <label className="block text-gray-300 font-semibold mb-2">

                Select Department

              </label>

              <select
                name="department"
                onChange={handleChange}
                required
                className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              >

                <option value="">
                  Choose Department
                </option>

                <option value="Railway">
                  Railway
                </option>

                <option value="Nagar Nigam">
                  Nagar Nigam
                </option>

                <option value="Gram Panchayat">
                  Gram Panchayat
                </option>

              </select>

            </div>

            {/* Category */}

            <div>

              <label className="block text-gray-300 font-semibold mb-2">

                Complaint Category

              </label>

              <select
                name="category"
                onChange={handleChange}
                required
                className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              >

                <option value="">
                  Select Category
                </option>

                {formData.department &&
                  categories[formData.department].map((item, index) => (

                    <option
                      key={index}
                      value={item}
                    >

                      {item}

                    </option>

                  ))}

              </select>

            </div>

            {/* Live Location */}

            <div>

              <label className="block text-gray-300 font-semibold mb-2">

                Live Location

              </label>

              <input
                type="text"
                name="location"
                placeholder="Fetching live location..."
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            {/* Priority */}

            <div>

              <label className="block text-gray-300 font-semibold mb-2">

                Priority Level

              </label>

              <select
                name="priority"
                onChange={handleChange}
                required
                className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
              >

                <option value="">
                  Select Priority
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>

            {/* Description */}

            <div>

              <label className="block text-gray-300 font-semibold mb-2">

                Complaint Description

              </label>

              <textarea
                rows="5"
                name="description"
                placeholder="Describe the issue in detail..."
                onChange={handleChange}
                required
                className="w-full border border-slate-700 bg-slate-950 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              ></textarea>

            </div>

            {/* Upload Image */}

            <div>

  <label className="block text-gray-300 font-semibold mb-2">
    Upload Complaint Image <span className="text-red-500">*</span>
  </label>

  <input
    type="file"
    accept=".jpg,.jpeg,.png,.webp"
    onChange={handleImage}
    required
    className="w-full border border-dashed border-slate-600 bg-slate-950 text-gray-300 rounded-2xl p-5 cursor-pointer hover:border-cyan-500 transition"
  />

  {/* Upload Guidelines */}
  <div className="mt-4 bg-slate-800 border border-slate-700 rounded-xl p-4">

    <h4 className="font-semibold text-cyan-400">
      📸 Image Upload Guidelines
    </h4>

    <ul className="mt-3 text-sm text-gray-300 space-y-2 list-disc list-inside">
      <li>Supported Formats: <b>JPG, JPEG, PNG, WEBP</b></li>
      <li>Maximum File Size: <b>5 MB</b></li>
      <li>Recommended Resolution: <b>1280 × 720</b> or higher</li>
      <li>Use a clear and recent image of the civic issue.</li>
      <li>Avoid blurry, dark or edited images.</li>
      <li>Ensure the issue is clearly visible.</li>
    </ul>

  </div>

  {/* Selected Image */}
  {formData.image && (

    <div className="mt-5 bg-slate-800 border border-green-700 rounded-xl p-5">

      <h4 className="text-green-400 font-bold mb-3">
        ✅ Selected Image
      </h4>

      {/* Preview */}
      <img
        src={URL.createObjectURL(formData.image)}
        alt="Preview"
        className="w-full max-w-sm h-60 object-cover rounded-xl border shadow"
      />

      <div className="mt-4 space-y-2">

        <p className="text-gray-700">
          <b>📄 File Name:</b> {formData.image.name}
        </p>

        <p
          className={`font-medium ${
            formData.image.size > 5 * 1024 * 1024
              ? "text-red-600"
              : "text-green-400"
          }`}
        >
          📦 Size: {(formData.image.size / 1024 / 1024).toFixed(2)} MB
        </p>

        <p className="text-gray-300">
          🖼️ Type: {formData.image.type}
        </p>

      </div>

      {formData.image.size > 5 * 1024 * 1024 && (
        <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3">

          <p className="text-red-700 font-semibold">
            ❌ File size exceeds 5 MB.
          </p>

          <p className="text-sm text-red-600 mt-1">
            Please choose a smaller image.
          </p>

        </div>
      )}

      <div className="mt-4 bg-slate-950 rounded-lg p-3 border border-slate-700">

        <p className="text-sm text-gray-300">
          💡 If the selected image is incorrect, choose another image before submitting the complaint.
        </p>

      </div>

    </div>

  )}

</div>


            {/* Submit Button */}

            <button
  type="submit"
  disabled={submitting}
  className={`w-full py-3 rounded-lg text-white font-semibold transition ${
    submitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-cyan-600 hover:bg-cyan-700"
  }`}
>
  {submitting ? (
    <>
      ⏳ Uploading Complaint...
    </>
  ) : (
    "Submit Complaint"
  )}
</button>

          </form>

        </div>

        {/* Preview Section */}

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 h-fit sticky top-5">

          <h2 className="text-2xl font-bold text-white mb-6">

            Complaint Preview

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-gray-400">
                Title
              </p>

              <h3 className="text-lg font-semibold text-white mt-1">

                {formData.title || "No Title"}

              </h3>

            </div>

            <div>

              <p className="text-gray-400">
                Department
              </p>

              <h3 className="text-lg font-semibold text-white mt-1">

                {formData.department || "Not Selected"}

              </h3>

            </div>

            <div>

              <p className="text-gray-400">
                Category
              </p>

              <h3 className="text-lg font-semibold text-white mt-1">

                {formData.category || "Not Selected"}

              </h3>

            </div>

            <div>

              <p className="text-gray-400">
                Priority
              </p>

              <h3 className="text-lg font-semibold text-red-500 mt-1">

                {formData.priority || "Not Selected"}

              </h3>

            </div>

            <div>

              <p className="text-gray-400">
                Live Location
              </p>

              <h3 className="text-lg font-semibold text-white mt-1 break-words">

                {formData.location || "Fetching location..."}

              </h3>

            </div>

            <div>

              <p className="text-gray-400">
                Description
              </p>

              <p className="text-gray-300 mt-2 leading-relaxed">

                {formData.description || "No description added"}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Report;
