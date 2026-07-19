import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";


function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      alert("password do not match");
      return;
    }
    try{
      const payload ={
        name: formData.fullName,
        email:formData.email,
        phone:formData.phone,
        address:formData.address,
        password:formData.password,
        role:"citizen",
      };
     console.log(payload);
      const res= await api.post("/auth/register",payload);
      alert(res.data.message);

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.user.role);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      navigate("/dashboard");
    }
    catch(error){
      console.log(error.response);
      alert(
    error.response?.data?.message ||
    error.response?.data?.errors?.[0]?.msg ||
    "Registration failed"
  );
}

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4 py-10">

      {/* Background Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-blue-600 opacity-20 blur-3xl rounded-full"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-[35px] border border-white/20 backdrop-blur-2xl bg-white/10 shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-cyan-500/20 to-blue-700/20">

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl">

            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="logo"
              className="w-14 h-14"
            />

          </div>

          <h1 className="text-5xl font-extrabold text-white mt-8 leading-tight">

            Civic Issue
            <br />
            Reporting System

          </h1>

          <p className="text-blue-100 mt-6 text-lg leading-relaxed">

            Report civic problems easily and help make your city smarter,
            cleaner, and safer for everyone.

          </p>

          <div className="mt-10 space-y-4 text-blue-100">

            <div className="flex items-center gap-3">
              ✅ Easy Complaint Tracking
            </div>

            <div className="flex items-center gap-3">
              ✅ Real-Time Updates
            </div>

            <div className="flex items-center gap-3">
              ✅ Fast Department Response
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <h2 className="text-4xl font-bold text-white text-center">
            Citizen Signup
          </h2>

          <p className="text-center text-gray-300 mt-3">
            Create your account to report civic issues
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">

            {/* Full Name */}
            <div>
              <label className="text-gray-200 block mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-200 block mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-200 block mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-gray-200 block mb-2">
                Address
              </label>

              <textarea
                name="address"
                rows="3"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                required
              ></textarea>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-200 block mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-200 block mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-300 mt-8">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-cyan-400 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;
