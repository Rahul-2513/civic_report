import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  clearStoredUser,
  getStoredUser,
  saveStoredUser,
  USER_UPDATED_EVENT,
} from "../utils/userSession";

function Sidebar() {
  const [user, setUser] = useState(() => getStoredUser());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        saveStoredUser(data.user);
      } catch (error) {
        console.error("Failed to load sidebar user:", error);
      }
    };

    fetchUser();

    const syncUser = () => {
      setUser(getStoredUser());
    };

    window.addEventListener(USER_UPDATED_EVENT, syncUser);

    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    clearStoredUser();

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

    <div className="w-72 h-screen overflow-y-auto bg-slate-900 text-white border-r border-slate-800 flex flex-col justify-between">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="p-6 border-b border-slate-800">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">

              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Civic Logo"
                className="w-6 h-6"
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold">

                Civic Portal

              </h1>

              <p className="text-gray-400 text-sm mt-1">

                Citizen Panel

              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {menuItems.map((item, index) => (

            <NavLink
              key={index}
              to={item.path}

              className={({ isActive }) =>

                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "hover:bg-slate-800 text-gray-200"
                }`
              }
            >

              <span className="text-xl">

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
      <div className="p-4 border-t border-slate-800">

        {/* User Card */}
        <div className="bg-slate-800 rounded-2xl p-4 flex items-center gap-4 border border-slate-700">

          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user?.name || "User"}
              className="w-12 h-12 rounded-full border border-cyan-400 object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border border-cyan-400 bg-cyan-100 text-cyan-700 flex items-center justify-center text-lg font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div>

            <h3 className="font-semibold text-lg">
              {user?.name || "Loading..."}
            </h3>

            <p className="text-sm text-gray-300">
              {user?.role || "Citizen"}
            </p>

          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-medium transition-all duration-200"
        >

          <span className="text-xl">
            🚪
          </span>

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;
