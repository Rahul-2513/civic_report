
import { useState } from "react";

function OfficerSettings() {

  const [darkMode, setDarkMode] =
    useState(true);

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [smsNotifications, setSmsNotifications] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your account preferences
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Account Settings */}
        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Account Settings
          </h2>

          <div className="space-y-5">

            <div>

              <label className="block mb-2 text-gray-400">
                Current Password
              </label>

              <input
                type="password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 text-gray-400">
                New Password
              </label>

              <input
                type="password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block mb-2 text-gray-400">
                Confirm Password
              </label>

              <input
                type="password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              />

            </div>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl">
              Change Password
            </button>

          </div>

        </div>

        {/* Notification Settings */}
        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Notification Settings
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <span>Email Notifications</span>

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() =>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
              />

            </div>

            <div className="flex justify-between items-center">

              <span>SMS Notifications</span>

              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={() =>
                  setSmsNotifications(
                    !smsNotifications
                  )
                }
              />

            </div>

          </div>

        </div>

      </div>

      {/* Appearance */}
      <div className="bg-slate-900 rounded-2xl p-6 mt-8">

        <h2 className="text-xl font-bold mb-6">
          Appearance
        </h2>

        <div className="flex justify-between items-center">

          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

        </div>

      </div>

      {/* Preferences */}
      <div className="bg-slate-900 rounded-2xl p-6 mt-8">

        <h2 className="text-xl font-bold mb-6">
          Preferences
        </h2>

        <div className="space-y-5">

          <div>

            <label className="block mb-2 text-gray-400">
              Language
            </label>

            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">

              <option>
                English
              </option>

              <option>
                Hindi
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 text-gray-400">
              Profile Visibility
            </label>

            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">

              <option>
                Public
              </option>

              <option>
                Private
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Save Button */}
      <div className="mt-8">

        <button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold">
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default OfficerSettings;
