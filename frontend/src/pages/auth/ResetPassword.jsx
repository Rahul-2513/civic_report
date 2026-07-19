import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError(
        "Password must be at least 8 characters"
      );
      return;
    }

    setError("");

    // Backend API Call Here

    alert("Password Reset Successfully");

    navigate("/login");

  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="text-center">

          <div className="w-16 h-16 mx-auto bg-cyan-600 rounded-2xl flex items-center justify-center text-3xl text-white mb-4">
            🔑
          </div>

          <h1 className="text-3xl font-bold text-white">
            Reset Password
          </h1>

          <p className="text-gray-400 mt-3">
            Create a new secure password for
            your account.
          </p>

        </div>

        {/* Error */}
        {error && (

          <div className="mt-6 bg-red-600/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl">

            {error}

          </div>

        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <div>

            <label className="block text-gray-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

          </div>

          <div>

            <label className="block text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Password Requirements */}
          <div className="bg-slate-800 rounded-xl p-4">

            <p className="text-gray-400 text-sm">
              Password Requirements:
            </p>

            <ul className="text-gray-500 text-sm mt-2 space-y-1">

              <li>
                • Minimum 8 characters
              </li>

              <li>
                • At least 1 uppercase letter
              </li>

              <li>
                • At least 1 number
              </li>

              <li>
                • At least 1 special character
              </li>

            </ul>

          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition py-3 rounded-xl text-white font-semibold"
          >
            Reset Password
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;
