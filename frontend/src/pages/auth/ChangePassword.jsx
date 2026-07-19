import { useState } from "react";

function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    // Backend API Call Here

    setSuccess(
      "Password changed successfully."
    );

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Change Password
          </h1>

          <p className="text-gray-400 mt-2">
            Update your account password to keep
            your account secure.
          </p>

        </div>

        {/* Success Message */}
        {success && (

          <div className="mb-6 bg-green-600/20 border border-green-500 text-green-400 px-4 py-3 rounded-xl">

            {success}

          </div>

        )}

        {/* Error Message */}
        {error && (

          <div className="mb-6 bg-red-600/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl">

            {error}

          </div>

        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Current Password */}
          <div>

            <label className="block text-gray-300 mb-2">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              placeholder="Enter current password"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* New Password */}
          <div>

            <label className="block text-gray-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-gray-300 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Password Requirements */}
          <div className="bg-slate-800 rounded-xl p-4">

            <h3 className="text-white font-semibold mb-3">
              Password Requirements
            </h3>

            <ul className="text-gray-400 text-sm space-y-2">

              <li>
                • Minimum 8 characters
              </li>

              <li>
                • At least 1 uppercase letter
              </li>

              <li>
                • At least 1 lowercase letter
              </li>

              <li>
                • At least 1 number
              </li>

              <li>
                • At least 1 special character
              </li>

            </ul>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition py-3 rounded-xl text-white font-semibold"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;