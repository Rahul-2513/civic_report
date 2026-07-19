
function OfficerPerformance() {

  const officers = [
    {
      id: "RW101",
      name: "Rahul Kumar",
      department: "Railway",
      assigned: 120,
      resolved: 110,
      pending: 10,
      efficiency: "92%",
    },
    {
      id: "NN205",
      name: "Amit Singh",
      department: "Nagar Nigam",
      assigned: 95,
      resolved: 82,
      pending: 13,
      efficiency: "86%",
    },
    {
      id: "GP302",
      name: "Ravi Kumar",
      department: "Gram Panchayat",
      assigned: 80,
      resolved: 62,
      pending: 18,
      efficiency: "77%",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Officer Performance
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor officer productivity and performance
        </p>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Officers
          </p>

          <h2 className="text-4xl font-bold mt-2">
            25
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Active Officers
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            22
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Avg Efficiency
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">
            85%
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Complaints Resolved
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            2540
          </h2>
        </div>

      </div>

      {/* Top Performer */}
      <div className="bg-gradient-to-r from-cyan-700 to-blue-700 rounded-2xl p-8 mb-8">

        <h2 className="text-2xl font-bold">
          🏆 Top Performer of the Month
        </h2>

        <p className="mt-3 text-lg">
          Rahul Kumar (RW101)
        </p>

        <p className="text-cyan-100">
          Resolution Rate: 92%
        </p>

      </div>

      {/* Performance Table */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-xl font-bold">
            Officer Ranking
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4">
                  Employee ID
                </th>

                <th className="text-left px-6 py-4">
                  Officer Name
                </th>

                <th className="text-left px-6 py-4">
                  Department
                </th>

                <th className="text-left px-6 py-4">
                  Assigned
                </th>

                <th className="text-left px-6 py-4">
                  Resolved
                </th>

                <th className="text-left px-6 py-4">
                  Pending
                </th>

                <th className="text-left px-6 py-4">
                  Efficiency
                </th>

              </tr>

            </thead>

            <tbody>

              {officers.map((officer) => (

                <tr
                  key={officer.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="px-6 py-4 font-semibold">
                    {officer.id}
                  </td>

                  <td className="px-6 py-4">
                    {officer.name}
                  </td>

                  <td className="px-6 py-4">
                    {officer.department}
                  </td>

                  <td className="px-6 py-4">
                    {officer.assigned}
                  </td>

                  <td className="px-6 py-4 text-green-400">
                    {officer.resolved}
                  </td>

                  <td className="px-6 py-4 text-yellow-400">
                    {officer.pending}
                  </td>

                  <td className="px-6 py-4">

                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                      {officer.efficiency}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Monthly Performance */}
      <div className="bg-slate-900 rounded-2xl p-6 mt-8">

        <h2 className="text-xl font-bold mb-6">
          Monthly Performance Overview
        </h2>

        <div className="space-y-5">

          <div>
            <div className="flex justify-between mb-2">
              <span>Railway Department</span>
              <span>88%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full">
              <div className="h-3 bg-cyan-500 rounded-full w-[88%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Nagar Nigam</span>
              <span>79%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full">
              <div className="h-3 bg-yellow-500 rounded-full w-[79%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Gram Panchayat</span>
              <span>68%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full">
              <div className="h-3 bg-red-500 rounded-full w-[68%]"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default OfficerPerformance;

