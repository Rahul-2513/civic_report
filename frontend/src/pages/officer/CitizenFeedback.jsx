
function CitizenFeedback() {

  const feedbacks = [
    {
      id: "CMP1023",
      citizen: "Rahul Kumar",
      department: "Railway",
      rating: 5,
      comment:
        "Issue was resolved quickly. Excellent service.",
      date: "06 Jun 2026",
    },
    {
      id: "CMP1045",
      citizen: "Aman Singh",
      department: "Nagar Nigam",
      rating: 4,
      comment:
        "Good work but took longer than expected.",
      date: "05 Jun 2026",
    },
    {
      id: "CMP1080",
      citizen: "Ravi Kumar",
      department: "Gram Panchayat",
      rating: 2,
      comment:
        "Issue was resolved but communication was poor.",
      date: "04 Jun 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Citizen Feedback
        </h1>

        <p className="text-gray-400 mt-2">
          Review citizen satisfaction and service quality
        </p>

      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Total Feedback
          </p>

          <h2 className="text-4xl font-bold mt-2">
            324
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Average Rating
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            4.3 ⭐
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Positive Feedback
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            85%
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6">

          <p className="text-gray-400">
            Improvement Needed
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            15%
          </h2>

        </div>

      </div>

      {/* Feedback List */}
      <div className="space-y-6">

        {feedbacks.map((item) => (

          <div
            key={item.id}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <div className="flex items-center gap-4">

                  <h2 className="text-xl font-bold">
                    {item.id}
                  </h2>

                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                    {"⭐".repeat(item.rating)}
                  </span>

                </div>

                <p className="text-gray-400 mt-2">
                  Citizen: {item.citizen}
                </p>

                <p className="text-gray-400">
                  Department: {item.department}
                </p>

                <p className="text-gray-400">
                  Date: {item.date}
                </p>

                <div className="bg-slate-800 rounded-xl p-4 mt-4">

                  <p className="text-gray-300">
                    "{item.comment}"
                  </p>

                </div>

              </div>

              <div>

                <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl">
                  View Complaint
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Rating Breakdown */}
      <div className="bg-slate-900 rounded-2xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Rating Breakdown
        </h2>

        <div className="space-y-4">

          <div>
            <div className="flex justify-between">
              <span>⭐⭐⭐⭐⭐</span>
              <span>60%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full mt-2">
              <div className="h-3 bg-green-500 rounded-full w-[60%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>⭐⭐⭐⭐</span>
              <span>20%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full mt-2">
              <div className="h-3 bg-cyan-500 rounded-full w-[20%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>⭐⭐⭐</span>
              <span>10%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full mt-2">
              <div className="h-3 bg-yellow-500 rounded-full w-[10%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>⭐⭐</span>
              <span>7%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full mt-2">
              <div className="h-3 bg-orange-500 rounded-full w-[7%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>⭐</span>
              <span>3%</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full mt-2">
              <div className="h-3 bg-red-500 rounded-full w-[3%]"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CitizenFeedback;

