import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Departments() {
const [departments, setDepartments] = useState([]);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

  const fetchDepartments = async () => {
  try {
    setLoading(true);

    const res = await api.get("/departments/public/all");

    if (res.data.success) {
      setDepartments(res.data.departments);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDepartments();
}, []);

const getColor = (name) => {
  switch (name) {
    case "Railway":
      return "from-blue-500 to-cyan-500";

    case "Gram Panchayat":
      return "from-green-500 to-emerald-500";

    case "Nagar Nigam":
      return "from-orange-500 to-red-500";

    default:
      return "from-gray-500 to-gray-600";
  }
};

const getIcon = (name) => {
  switch (name) {
    case "Railway":
      return "🚆";

    case "Gram Panchayat":
      return "🌾";

    case "Nagar Nigam":
      return "🏛️";

    default:
      return "🏢";
  }
};

  return (

    <div className="p-2">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">

          Departments & Services 🏛

        </h1>

        <p className="mt-3 text-lg text-blue-100">

          Choose the appropriate department for your civic issue reporting.

        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Total Departments

          </p>

          <h1 className="text-4xl font-bold text-blue-600 mt-4">

            {departments.length}

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Total Officers

          </p>

          <h1 className="text-4xl font-bold text-cyan-500 mt-4">

            {departments.reduce((total, dept) => total + dept.posts.length, 0)}

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Resolved Complaints

          </p>

          <h1 className="text-4xl font-bold text-green-500 mt-4">

            512

          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500 text-lg">

            Avg Response Time

          </p>

          <h1 className="text-4xl font-bold text-orange-500 mt-4">

            4h

          </h1>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">

              Available Departments

            </h2>

            <p className="text-gray-500 mt-2">

              Explore all civic departments and services

            </p>

          </div>

          <input
            type="text"
            placeholder="Search department..."
            className="border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Department Cards */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        {departments.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition duration-300"
          >

            {/* Top Gradient */}

            <div className={`bg-gradient-to-r ${getColor(item.name)} p-8 text-white`}>

              <div className="flex items-center justify-between">

                <div>

                  <h1 className="text-5xl">

                    {getIcon(item.name)}

                  </h1>

                  <h2 className="text-3xl font-bold mt-5">

                    {item.name}

                  </h2>

                </div>

                <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-center">

                  <h3 className="text-2xl font-bold">

                    <p className="text-gray-500 mb-5">
                          {item.description}
                     </p>

                  </h3>

                  <p className="text-sm">

                    Active Cases

                  </p>

                </div>

              </div>

            </div>

            {/* Services */}

            <div className="p-8">

              <h3 className="text-xl font-bold text-gray-800 mb-5">

                Services

              </h3>

              <div className="space-y-3">

                {item.posts.map((post, i) => (
               <div key={i} className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                    <p>{post}</p>

                      </div>
                       ))
                }

              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-gray-50 rounded-2xl p-5 text-center">

                  <p className="text-gray-500 text-sm">

                    Resolution Rate

                  </p>

                  <h3 className="text-2xl font-bold text-green-500 mt-2">

                    {item.resolved}

                  </h3>

                </div>

                <div className="bg-gray-50 rounded-2xl p-5 text-center">

                  <p className="text-gray-500 text-sm">

                    Response Time

                  </p>

                  <h3 className="text-2xl font-bold text-blue-500 mt-2">

                    {item.response}

                  </h3>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex gap-4 mt-8">

                <button
                  onClick={() => navigate("/report")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition"
                >

                  Report Issue

                </button>

                <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-2xl font-semibold transition">

                  View Details

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Performance Section */}

      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* Department Performance */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">

            Department Performance 📈

          </h2>

          <div className="space-y-8">

            {/* Railway */}

            <div>

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-lg">

                  Railway

                </h3>

                <p className="text-green-500 font-bold">

                  92%

                </p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-3">

                <div className="bg-green-500 h-4 rounded-full w-[92%]"></div>

              </div>

            </div>

            {/* Nagar Nigam */}

            <div>

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-lg">

                  Nagar Nigam

                </h3>

                <p className="text-blue-500 font-bold">

                  85%

                </p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-3">

                <div className="bg-blue-500 h-4 rounded-full w-[85%]"></div>

              </div>

            </div>

            {/* Gram Panchayat */}

            <div>

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-lg">

                  Gram Panchayat

                </h3>

                <p className="text-orange-500 font-bold">

                  88%

                </p>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-3">

                <div className="bg-orange-500 h-4 rounded-full w-[88%]"></div>

              </div>

            </div>

          </div>

        </div>

        {/* Emergency Contacts */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">

            Emergency Contacts ☎

          </h2>

          <div className="space-y-6">

            <div className="bg-blue-50 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-blue-600">

                Railway Helpline

              </h3>

              <p className="text-gray-600 mt-2">

                +91 9876543210

              </p>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-orange-600">

                Nagar Nigam Office

              </h3>

              <p className="text-gray-600 mt-2">

                +91 9876543220

              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-green-600">

                Gram Panchayat Office

              </h3>

              <p className="text-gray-600 mt-2">

                +91 9876543230

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Departments;
