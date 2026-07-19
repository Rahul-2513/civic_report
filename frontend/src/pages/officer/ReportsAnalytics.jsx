
function ReportsAnalytics() {

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor complaint performance and department analytics
        </p>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Complaints
          </p>

          <h2 className="text-4xl font-bold mt-3">
            1,245
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Resolved
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            980
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            215
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Escalated
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-3">
            50
          </h2>
        </div>

      </div>

      {/* Analytics Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Monthly Trend */}
        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Monthly Complaint Trend
          </h2>

          <div className="space-y-4">

            <div>
              <div className="flex justify-between mb-1">
                <span>January</span>
                <span>120</span>
              </div>

              <div className="h-3 bg-slate-800 rounded-full">
                <div className="h-3 bg-cyan-500 rounded-full w-[40%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>February</span>
                <span>180</span>
              </div>

              <div className="h-3 bg-slate-800 rounded-full">
                <div className="h-3 bg-cyan-500 rounded-full w-[60%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>March</span>
                <span>250</span>
              </div>

              <div className="h-3 bg-slate-800 rounded-full">
                <div className="h-3 bg-cyan-500 rounded-full w-[85%]"></div>
              </div>
            </div>

          </div>

        </div>

        {/* Resolution Rate */}
        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-6">
            Resolution Performance
          </h2>

          <div className="flex flex-col gap-6">

            <div className="bg-slate-800 rounded-xl p-4">

              <p className="text-gray-400">
                Resolution Rate
              </p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                78%
              </h3>

            </div>

            <div className="bg-slate-800 rounded-xl p-4">

              <p className="text-gray-400">
                Average Resolution Time
              </p>

              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                2.4 Days
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Department Performance */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Department Performance
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-3">
                Department
              </th>

              <th className="text-left py-3">
                Complaints
              </th>

              <th className="text-left py-3">
                Resolved
              </th>

              <th className="text-left py-3">
                Pending
              </th>

              <th className="text-left py-3">
                Efficiency
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-slate-800">

              <td className="py-4">
                Railway
              </td>

              <td>450</td>

              <td>390</td>

              <td>60</td>

              <td className="text-green-400">
                87%
              </td>

            </tr>

            <tr className="border-b border-slate-800">

              <td className="py-4">
                Nagar Nigam
              </td>

              <td>520</td>

              <td>410</td>

              <td>110</td>

              <td className="text-yellow-400">
                79%
              </td>

            </tr>

            <tr>

              <td className="py-4">
                Gram Panchayat
              </td>

              <td>275</td>

              <td>180</td>

              <td>95</td>

              <td className="text-red-400">
                65%
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Complaint Categories */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6">

          <h3 className="font-bold text-lg">
            Garbage Issues
          </h3>

          <p className="text-4xl font-bold mt-4 text-cyan-400">
            420
          </p>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <h3 className="font-bold text-lg">
            Water Leakage
          </h3>

          <p className="text-4xl font-bold mt-4 text-blue-400">
            310
          </p>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <h3 className="font-bold text-lg">
            Street Light Issues
          </h3>

          <p className="text-4xl font-bold mt-4 text-yellow-400">
            185
          </p>

        </div>

      </div>

    </div>
  );
}

export default ReportsAnalytics;
