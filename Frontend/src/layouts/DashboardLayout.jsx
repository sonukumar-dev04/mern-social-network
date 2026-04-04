import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { pathname } = useLocation();

  const isMessagePage = pathname === "/message";

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar2 />

      {isMessagePage ? (
        // Message page: no footer, no scroll — but add bottom padding on mobile for tab bar
        <main className="flex-1 overflow-hidden bg-gray-100 p-4 pb-20 md:pb-4">
          <Outlet />
        </main>
      ) : (
        // All other pages: scrollable with footer, bottom padding on mobile for tab bar
        <div className="flex-1 overflow-y-auto flex flex-col">
          <main className="flex-1 md:pb-0">
            <Outlet />
          </main>
          <Footer className="mb-16" />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
