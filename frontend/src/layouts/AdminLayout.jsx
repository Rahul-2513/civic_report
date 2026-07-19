import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";

function AdminLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-950">

      {/* Sidebar */}
      <div className="w-72 h-screen overflow-y-auto border-r border-slate-800">
        <AdminSidebar />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col h-screen">

        {/* Scrollable Content */}
        <main
           id="admin-main"
            className="flex-1 overflow-y-auto p-6"
              >
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}

export default AdminLayout;
