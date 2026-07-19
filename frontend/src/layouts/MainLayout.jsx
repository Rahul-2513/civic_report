import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

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
