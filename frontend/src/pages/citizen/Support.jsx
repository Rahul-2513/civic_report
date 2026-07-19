export default function HelpSupportSection() {
  const faqs = [
    {
      question: "How can I report a civic issue?",
      answer:
        "Click on the 'Add New Issue' button, upload an image, add location details, and submit your complaint.",
    },
    {
      question: "How do I track my complaint status?",
      answer:
        "Go to the 'My Reports' section and check the live status of your submitted complaint.",
    },
    {
      question: "Can I reopen a resolved issue?",
      answer:
        "Yes, if the issue is not properly resolved, you can reopen it from the complaint details page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Help & Support
            </h1>
            <p className="text-gray-500 mt-2">
              Get assistance, raise support tickets, and find answers to common questions.
            </p>
          </div>

          {/* Support Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">📞</div>
              <h2 className="font-semibold text-lg">Call Support</h2>
              <p className="text-gray-500 text-sm mt-2">
                Connect directly with our civic support team.
              </p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                Call Now
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">💬</div>
              <h2 className="font-semibold text-lg">Live Chat</h2>
              <p className="text-gray-500 text-sm mt-2">
                Chat instantly with our support executive.
              </p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
                Start Chat
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">📧</div>
              <h2 className="font-semibold text-lg">Email Support</h2>
              <p className="text-gray-500 text-sm mt-2">
                Send your issue details through email.
              </p>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700">
                Send Email
              </button>
            </div>
          </div>

          {/* FAQ Section */}
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
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Support Ticket */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Raise Support Ticket
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows="5"
                placeholder="Describe your issue..."
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Submit Ticket
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>

            <div className="space-y-4 text-gray-600">
              <div>
                <p className="font-semibold">📍 Office Address</p>
                <p>Municipal Civic Office, Smart City Center</p>
              </div>

              <div>
                <p className="font-semibold">📞 Phone</p>
                <p>+91 98765 43210</p>
              </div>

              <div>
                <p className="font-semibold">📧 Email</p>
                <p>support@civicsystem.com</p>
              </div>

              <div>
                <p className="font-semibold">⏰ Working Hours</p>
                <p>Monday - Saturday (9 AM - 6 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
