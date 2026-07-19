import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API call here
    console.log("Reset link sent to:", email);

    alert(
      "Password reset link has been sent to your email."
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-600 flex items-center justify-center text-3xl text-white mb-4">
            🔐
          </div>

          <h1 className="text-3xl font-bold text-white">
            Forgot Password
          </h1>

          <p className="text-gray-400 mt-3">
            Enter your registered email address.
            We will send a password reset link.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="block text-gray-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition py-3 rounded-xl text-white font-semibold"
          >
            Send Reset Link
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

export default ForgotPassword;