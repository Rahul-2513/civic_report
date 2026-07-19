import { useState } from "react";

function Settings() {

  const [darkMode, setDarkMode] = useState(false);

  const [emailNotif, setEmailNotif] = useState(true);

  const [smsNotif, setSmsNotif] = useState(false);

  const [pushNotif, setPushNotif] = useState(true);

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">

          Settings ⚙

        </h1>

        <p className="mt-3 text-lg text-blue-100">

          Manage your account preferences, notifications and security settings.

        </p>

      </div>

      {/* Main Grid */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        {/* Left Sidebar */}

        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">

          <h2 className="text-2xl font-bold text-gray-800">

            Settings Menu

          </h2>

          <div className="mt-8 flex flex-col gap-4">

            <button className="bg-blue-600 text-white px-5 py-4 rounded-2xl text-left font-semibold">

              Account Settings

            </button>

            <button className="hover:bg-gray-100 px-5 py-4 rounded-2xl text-left font-semibold transition">

              Notifications

            </button>

            <button className="hover:bg-gray-100 px-5 py-4 rounded-2xl text-left font-semibold transition">

              Security

            </button>

            <button className="hover:bg-gray-100 px-5 py-4 rounded-2xl text-left font-semibold transition">

              Appearance

            </button>

            <button className="hover:bg-gray-100 px-5 py-4 rounded-2xl text-left font-semibold transition">

              Privacy

            </button>

          </div>

        </div>

        {/* Right Content */}

        <div className="col-span-2 space-y-8">

          {/* Account Settings */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">

                  Account Information

                </h2>

                <p className="text-gray-500 mt-2">

                  Update your personal details

                </p>

              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition">

                Save Changes

              </button>

            </div>

            {/* Form */}

            <div className="grid grid-cols-2 gap-6 mt-10">

              {/* Name */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Full Name

                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Email */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Email Address

                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Phone */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  Phone Number

                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* City */}

              <div>

                <label className="block text-gray-700 font-semibold mb-2">

                  City

                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          </div>

          {/* Notification Settings */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800">

              Notification Preferences 🔔

            </h2>

            <p className="text-gray-500 mt-2">

              Manage how you receive updates

            </p>

            <div className="space-y-6 mt-10">

              {/* Email */}

              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">

                <div>

                  <h3 className="text-lg font-semibold">

                    Email Notifications

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    Receive complaint updates by email

                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() => setEmailNotif(!emailNotif)}
                  className="w-6 h-6"
                />

              </div>

              {/* SMS */}

              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">

                <div>

                  <h3 className="text-lg font-semibold">

                    SMS Alerts

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    Receive important SMS alerts

                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={() => setSmsNotif(!smsNotif)}
                  className="w-6 h-6"
                />

              </div>

              {/* Push */}

              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">

                <div>

                  <h3 className="text-lg font-semibold">

                    Push Notifications

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    Receive instant app notifications

                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={pushNotif}
                  onChange={() => setPushNotif(!pushNotif)}
                  className="w-6 h-6"
                />

              </div>

            </div>

          </div>

          {/* Appearance */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800">

              Appearance 🎨

            </h2>

            <p className="text-gray-500 mt-2">

              Customize application appearance

            </p>

            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5 mt-8">

              <div>

                <h3 className="text-lg font-semibold">

                  Dark Mode

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Enable dark theme for better experience

                </p>

              </div>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-6 h-6"
              />

            </div>

          </div>

          {/* Security */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800">

              Security 🔐

            </h2>

            <p className="text-gray-500 mt-2">

              Protect your account and privacy

            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition">

                Change Password

              </button>

              <button className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition">

                Logout All Devices

              </button>

            </div>

          </div>

          {/* Danger Zone */}

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-200">

            <h2 className="text-3xl font-bold text-red-500">

              Danger Zone ⚠

            </h2>

            <p className="text-gray-500 mt-2">

              Permanent actions related to your account

            </p>

            <div className="flex gap-6 mt-10">

              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold transition">

                Delete Account

              </button>

              <button className="border border-gray-300 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold transition">

                Logout

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;
