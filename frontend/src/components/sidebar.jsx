import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  const menuItems = [

    {
      name: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },

    {
      name: "Report Issue",
      icon: "📝",
      path: "/report",
    },

    {
      name: "My Complaints",
      icon: "📋",
      path: "/my-complaints",
    },

    {
      name: "Track Complaint",
      icon: "📍",
      path: "/track",
    },

    {
      name: "Notifications",
      icon: "🔔",
      path: "/notifications",
    },

    {
      name: "Departments",
      icon: "🏛",
      path: "/departments",
    },

    {
      name: "Profile",
      icon: "👤",
      path: "/profile",
    },

    {
      name: "Settings",
      icon: "⚙",
      path: "/settings",
    },

    {
      name: "Help & Support",
      icon: "💬",
      path: "/support",
    },

  ];

  return (

    <div className="w-72 h-screen overflow-y-auto bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white flex flex-col justify-between shadow-2xl">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">

              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Civic Logo"
                className="w-9 h-9"
              />

            </div>

            <div>

              <h1 className="text-3xl font-extrabold tracking-wide">

                Civic Connect

              </h1>

              <p className="text-gray-300 text-sm mt-1">

                Your Voice, Our Action

              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}
        <div className="mt-8 px-4 flex flex-col gap-3">

          {menuItems.map((item, index) => (

            <NavLink
              key={index}
              to={item.path}

              className={({ isActive }) =>

                `flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-xl"
                    : "hover:bg-white/10 text-gray-200"
                }`
              }
            >

              <span className="text-2xl">

                {item.icon}

              </span>

              <span>

                {item.name}

              </span>

            </NavLink>

          ))}

        </div>

      </div>

      {/* Bottom User Section */}
      <div className="p-5 border-t border-white/10">

        {/* User Card */}
        <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-4">

          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-cyan-400"
          />

          <div>

            <h3 className="font-semibold text-lg">
              Sumit Kumar
            </h3>

            <p className="text-sm text-gray-300">
              Citizen
            </p>

          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-5 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl"
        >

          <span className="text-2xl">
            🚪
          </span>

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;