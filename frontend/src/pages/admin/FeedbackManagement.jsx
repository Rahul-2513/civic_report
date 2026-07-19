import { useState } from "react";

function FeedbackManagement() {

  const [feedbacks] = useState([
    {
      id: 1,
      citizen: "Rohan Kumar",
      officer: "Rahul Kumar",
      department: "Railway",
      rating: 5,
      feedback:
        "Complaint resolved quickly and officer was very cooperative.",
      date: "14 Jun 2026",
    },
    {
      id: 2,
      citizen: "Amit Singh",
      officer: "Amit Verma",
      department: "Nagar Nigam",
      rating: 4,
      feedback:
        "Issue resolved successfully but response time was slightly delayed.",
      date: "13 Jun 2026",
    },
    {
      id: 3,
      citizen: "Priya Sharma",
      officer: "Ravi Kumar",
      department: "Gram Panchayat",
      rating: 2,
      feedback:
        "Complaint remained pending for several days.",
      date: "12 Jun 2026",
    },
  ]);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Feedback Management
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor citizen satisfaction and officer performance.
          </p>

        </div>

        <button className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-semibold">
          Export Feedback Report
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Feedback
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            1,284
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-yellow-400">
            Average Rating
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            4.4 ⭐
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-green-400">
            Positive Feedback
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            85%
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <p className="text-red-400">
            Negative Feedback
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            15%
          </h2>

        </div>

      </div>

      {/* Feedback Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h2 className="text-2xl font-semibold text-white">
            Citizen Feedback Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left px-6 py-4 text-gray-300">
                  Citizen
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Officer
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Rating
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Feedback
                </th>

                <th className="text-left px-6 py-4 text-gray-300">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {feedbacks.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="px-6 py-4 text-white">
                    {item.citizen}
                  </td>

                  <td className="px-6 py-4 text-white">
                    {item.officer}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item.department}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.rating >= 4
                          ? "bg-green-600"
                          : item.rating === 3
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.rating} ⭐
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item.feedback}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {item.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Insights */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Feedback Insights
        </h2>

        <div className="space-y-4 text-gray-300">

          <p>
            ✅ Most citizens are satisfied with complaint resolution.
          </p>

          <p>
            📈 Railway Department received the highest average rating.
          </p>

          <p>
            ⚠️ Gram Panchayat has the highest number of negative reviews.
          </p>

          <p>
            👮 Rahul Kumar is the highest-rated officer this month.
          </p>

        </div>

      </div>

    </div>
  );
}

export default FeedbackManagement;