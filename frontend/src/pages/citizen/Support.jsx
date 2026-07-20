import { useEffect, useState } from "react";
import api from "../../services/api";

const fallbackContacts = {
  Railway: {
    phone: "+91 1800 111 139",
    email: "railway.support@civicconnect.in",
  },
  "Gram Panchayat": {
    phone: "+91 1800 222 445",
    email: "panchayat.support@civicconnect.in",
  },
  "Nagar Nigam": {
    phone: "+91 1800 333 556",
    email: "nigam.support@civicconnect.in",
  },
};

function HelpSupportSection() {
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const [
          userRes,
          departmentsRes,
          complaintsRes,
          notificationsRes,
        ] = await Promise.all([
          api.get("/auth/me"),
          api.get("/departments/public/all"),
          api.get("/complaints/my-complaints"),
          api.get("/notifications/me"),
        ]);

        const currentUser = userRes.data.user;
        setUser(currentUser);
        setDepartments(departmentsRes.data.departments || []);
        setComplaints(complaintsRes.data.complaints || []);
        setNotifications(notificationsRes.data.notifications || []);
        setFormData((current) => ({
          ...current,
          name: currentUser?.name || "",
          email: currentUser?.email || "",
        }));
      } catch (error) {
        console.error("Failed to load support data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportData();
  }, []);

  const latestComplaint = complaints[0];
  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;
  const activeComplaints = complaints.filter(
    (item) =>
      item.status !== "Resolved" && item.status !== "Rejected"
  ).length;

  const faqs = [
    {
      question: "How can I report a civic issue?",
      answer: `Use the Report Issue page to submit a complaint to one of the ${departments.length || 0} active department(s).`,
    },
    {
      question: "How do I track my complaint status?",
      answer: latestComplaint
        ? `Your latest complaint is currently "${latestComplaint.status}". You can track it anytime from the Track Complaint page using ID ${latestComplaint._id}.`
        : "Once you submit a complaint, you can track it from the Track Complaint page using the complaint ID.",
    },
    {
      question: "Where can I see officer updates?",
      answer:
        unreadCount > 0
          ? `You currently have ${unreadCount} unread notification(s) with status updates and officer responses.`
          : "Officer responses and complaint updates appear in your Notifications and Track Complaint pages.",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Support Request from ${formData.name || "Citizen"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nIssue:\n${formData.issue}`
    );

    window.location.href = `mailto:support@civicconnect.in?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading support center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Help & Support
            </h1>

            <p className="text-gray-500 mt-2">
              Get assistance based on your live complaints, notifications, and active departments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">📞</div>
              <h2 className="font-semibold text-lg">Call Support</h2>
              <p className="text-gray-500 text-sm mt-2">
                Talk to civic support for active complaint follow-up.
              </p>
              <a
                href={`tel:${fallbackContacts[latestComplaint?.department || "Railway"].phone}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Call Now
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">💬</div>
              <h2 className="font-semibold text-lg">Live Updates</h2>
              <p className="text-gray-500 text-sm mt-2">
                You have {unreadCount} unread update(s) from the system.
              </p>
              <button
                type="button"
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                Check Notifications
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">📧</div>
              <h2 className="font-semibold text-lg">Email Support</h2>
              <p className="text-gray-500 text-sm mt-2">
                Raise a support request with your complaint details.
              </p>
              <a
                href={`mailto:${fallbackContacts[latestComplaint?.department || "Railway"].email}`}
                className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
              >
                Send Email
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow p-5">
              <p className="text-gray-500 text-sm">
                Total Complaints
              </p>
              <h2 className="mt-3 text-3xl font-bold text-blue-600">
                {complaints.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <p className="text-gray-500 text-sm">
                Active Complaints
              </p>
              <h2 className="mt-3 text-3xl font-bold text-orange-500">
                {activeComplaints}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <p className="text-gray-500 text-sm">
                Active Departments
              </p>
              <h2 className="mt-3 text-3xl font-bold text-green-600">
                {departments.length}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    {faq.question}
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Department Help Desk
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {departments.map((department) => {
                const contact =
                  fallbackContacts[department.name] ||
                  fallbackContacts.Railway;

                return (
                  <div
                    key={department._id}
                    className="rounded-2xl border border-gray-200 p-5"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {department.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {department.description}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p>Phone: {contact.phone}</p>
                      <p>Email: {contact.email}</p>
                      <p>
                        Officers Available: {department.totalOfficers || 0}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Raise Support Ticket
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows="5"
                value={formData.issue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    issue: e.target.value,
                  })
                }
                placeholder="Describe your issue..."
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Submit Ticket
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>

            <div className="space-y-4 text-gray-600">
              <div>
                <p className="font-semibold">👤 Logged In User</p>
                <p>{user?.name || "Citizen"}</p>
              </div>

              <div>
                <p className="font-semibold">📧 Email</p>
                <p>{user?.email || "support@civicconnect.in"}</p>
              </div>

              <div>
                <p className="font-semibold">📞 Priority Contact</p>
                <p>
                  {
                    fallbackContacts[
                      latestComplaint?.department || "Railway"
                    ].phone
                  }
                </p>
              </div>

              <div>
                <p className="font-semibold">📝 Latest Complaint</p>
                <p>
                  {latestComplaint
                    ? `${latestComplaint.category} - ${latestComplaint.status}`
                    : "No complaint submitted yet"}
                </p>
              </div>

              <div>
                <p className="font-semibold">⏰ Support Hours</p>
                <p>Monday - Saturday (9 AM - 6 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSupportSection;
