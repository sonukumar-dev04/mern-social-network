import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  const isMessagePage = pathname === "/message";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar2 />

      {isMessagePage ? (
        <main className="flex-1 overflow-hidden bg-gray-100 p-4 pb-20 md:pb-4">
          <Outlet />
        </main>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col">
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
