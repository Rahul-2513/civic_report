import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;
