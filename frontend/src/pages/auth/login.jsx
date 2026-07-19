import api from "../../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("citizen");

  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    password: "",
    department: "",
    post: "",
  });

  // Department Wise Officer Posts
  const departmentPosts = {

    Railway: [
      "Housekeeping Staff",
      "Cleaning Supervisor",
      "Health Inspector",
      "Chief Health Inspector",
      "Divisional Officer",
      "Zonal Head",
    ],

    "Nagar Nigam": [
      "Safai Karamchari",
      "Cleaning Supervisor",
      "Sanitary Inspector",
      "Chief Sanitary Inspector",
      "Ward Officer",
      "Municipal Commissioner",
    ],

    "Gram Panchayat": [
      "Safai Karamchari",
      "Ward Supervisor",
      "Panchayat Sachiv",
      "Mukhiya",
      "BDO",
      "District Officer",
    ],
  };

  const posts =
    departmentPosts[formData.department] || [];

    const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};

  // Handle Input Change
 const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    const payload = {
  role: role.toLowerCase(),
  email: formData.email,
  password: formData.password,
};
    if(role === "officer"){
      payload.employeeId= formData.employeeId;
      payload.department= formData.department;
      payload.post= formData.post;
    }
    const res = await api.post("/auth/login",payload);
    localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.user.role);
localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

    if (res.data.user.role === "citizen") {
  navigate("/dashboard");
}
else if (res.data.user.role === "officer") {
  navigate("/officer/dashboard");
}
else if (res.data.user.role === "admin") {
  navigate("/admin/dashboard");
}
  } catch(err){
    alert(err.response?.data?.message || "Login failed");
  }
 };
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4 py-10">

      {/* Background Blur Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[35px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-cyan-500/10 to-blue-700/20">

          {/* Logo */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl">

            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="logo"
              className="w-14 h-14"
            />

          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-white mt-8 leading-tight">

            Civic Issue
            <br />
            Reporting System

          </h1>

          {/* Description */}
          <p className="text-blue-100 mt-6 text-lg leading-relaxed">

            Smart digital platform for managing
            public complaints, department operations,
            and officer escalation workflows.

          </p>

          {/* Features */}
          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3 text-blue-100 text-lg">

              ✅ Real-Time Complaint Tracking

            </div>

            <div className="flex items-center gap-3 text-blue-100 text-lg">

              ✅ Department-Based Management

            </div>

            <div className="flex items-center gap-3 text-blue-100 text-lg">

              ✅ Smart Escalation System

            </div>

            <div className="flex items-center gap-3 text-blue-100 text-lg">

              ✅ Multi-Level Officer Monitoring

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          {/* Heading */}
          <h2 className="text-4xl font-bold text-white text-center">

            Login Portal

          </h2>

          <p className="text-center text-gray-300 mt-3">

            Access your civic management account

          </p>

          {/* Role Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-8">

            <button
              type="button"
              onClick={() => setRole("citizen")}
              className={`py-3 rounded-2xl font-semibold transition-all duration-300 ${
                role === "citizen"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >

              Citizen Login

            </button>

            <button
              type="button"
              onClick={() => setRole("officer")}
              className={`py-3 rounded-2xl font-semibold transition-all duration-300 ${
                role === "officer"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >

              Officer Login

            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`py-3 rounded-2xl font-semibold transition-all duration-300 ${
                role === "admin"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >

              admin Login

            </button>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Officer Fields */}
            {role === "officer" && (

              <>

                {/* Department */}
                <div>

                  <label className="text-gray-200 block mb-2 font-medium">

                    Select Department

                  </label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/20 text-white outline-none focus:border-cyan-400 transition"
                  >

                    <option value="">

                      Choose Department

                    </option>

                    <option value="Railway">

                      Railway Department

                    </option>

                    <option value="Nagar Nigam">

                      Nagar Nigam Department

                    </option>

                    <option value="Gram Panchayat">

                      Gram Panchayat Department

                    </option>

                  </select>

                </div>

                {/* Officer Post */}
                <div>

                  <label className="text-gray-200 block mb-2 font-medium">

                    Select Officer Post

                  </label>

                  <select
                    name="post"
                    value={formData.post}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/20 text-white outline-none focus:border-cyan-400 transition"
                  >

                    <option value="">

                      Choose Officer Post

                    </option>

                    {posts.map((post, index) => (

                      <option
                        key={index}
                        value={post}
                      >

                        {post}

                      </option>

                    ))}

                  </select>

                </div>

                {/* Employee ID */}
                <div>

                  <label className="text-gray-200 block mb-2 font-medium">

                    Employee ID

                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Enter employee ID"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
                  />

                </div>

              </>

            )}

            {/* Email */}
            <div>

              <label className="text-gray-200 block mb-2 font-medium">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
              />

            </div>

            {/* Password */}
            <div>

              <label className="text-gray-200 block mb-2 font-medium">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition"
              />

            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-300">

                <input type="checkbox" />

                Remember Me

              </label>

              <Link
                      to="/forgot-password"
                 className="text-cyan-400 hover:underline"
                                                    >
                                 Forgot Password?
                             </Link>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >

              Login Now

            </button>

          </form>

          {/* Signup */}
          {role === "citizen" && (

            <p className="text-center text-gray-300 mt-8">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-cyan-400 font-semibold hover:underline"
              >

                Create Account

              </Link>

            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default Login;

