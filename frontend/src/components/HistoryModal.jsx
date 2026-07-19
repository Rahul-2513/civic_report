import { useEffect, useState } from "react";
import axios from "axios";

function HistoryModal({ show, onClose, citizenId }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && citizenId) {
      fetchHistory();
    }
  }, [show, citizenId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/admin/citizens/${citizenId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto p-6">

        <div className="flex justify-between mb-6">

          <h2 className="text-2xl text-white font-bold">
            Citizen Complaint History
          </h2>

          <button
            onClick={onClose}
            className="text-white text-xl"
          >
            ✕
          </button>

        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <>
            <h3 className="text-cyan-400 mb-4">
              Total Complaints : {history?.totalComplaints}
            </h3>

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Priority</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>

              </thead>

              <tbody>

                {history?.complaints.map((c) => (

                  <tr
                    key={c._id}
                    className="border-b border-slate-700"
                  >
                    <td className="p-3 text-white">{c.title}</td>
                    <td className="p-3 text-white">{c.department}</td>
                    <td className="p-3 text-white">{c.priority}</td>
                    <td className="p-3 text-white">{c.status}</td>
                    <td className="p-3 text-white">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>

                ))}

              </tbody>

            </table>

          </>
        )}

      </div>

    </div>
  );
}

export default HistoryModal;
