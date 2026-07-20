import { useEffect, useState } from "react";
import api from "../services/api";
import {
  getStoredUser,
  saveStoredUser,
  USER_UPDATED_EVENT,
} from "../utils/userSession";

function Navbar() {
  const [user, setUser] = useState(() => getStoredUser());
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const [{ data: userData }, { data: notificationData }] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/notifications/me"),
          ]);

        setUser(userData.user);
        setUnreadCount(notificationData.unreadCount || 0);
        saveStoredUser(userData.user);
      } catch (error) {
        console.error("Failed to load navbar data:", error);
      }
    };

    fetchNavbarData();

    const syncUser = () => {
      setUser(getStoredUser());
    };

    window.addEventListener(USER_UPDATED_EVENT, syncUser);

    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, syncUser);
    };
  }, []);

  return (
    <div className="h-20 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between">

      <div className="w-[400px]">

        <input type="text" placeholder="Search complaints ..."
        className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-gray-500 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="flex items-center gap-6">

         <div className="relative cursor-pointer">

          <span className="text-2xl text-gray-200">
            🔔
          </span>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}

        </div>
        <div className=" flex items-center gap-3 cursor-pointer">
            {user?.profileImage ? (
              <img
              src={user.profileImage}
              alt={user?.name || "profile"}
              className="w-10 h-10 rounded-full border border-cyan-400 object-cover"/>
            ) : (
              <div className="w-10 h-10 rounded-full border border-cyan-400 bg-cyan-100 text-cyan-700 flex items-center justify-center font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div>
               <h4 className="font-semibold text-white">
              {user?.name || "Loading..."}</h4>
              <p className="text-sm text-gray-400">
                {user?.role || "User"}
              </p>
            </div>
        </div>
      </div>

    </div>
    
  
  );
}

export default Navbar;
