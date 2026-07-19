import OfficerSidebar from "../components/OfficerSidebar";
import Footer from "../components/footer";

function OfficerLayout({ children }) {
  return (
    <div className="bg-slate-950 min-h-screen">

      <OfficerSidebar />

      <div className="ml-72 flex flex-col min-h-screen">

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default OfficerLayout;
