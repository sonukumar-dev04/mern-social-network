import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ProNetLogo from "../ProNetLogo";

const Navbar1 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when route would change
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" onClick={closeMenu}>
          <ProNetLogo />
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            to="/signup"
            className="text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
          >
            Join now
          </Link>
          <Link
            to="/signin"
            className="text-sm font-semibold text-blue-600 border border-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-2 shadow-md">
          <Link
            to="/signup"
            onClick={closeMenu}
            className="w-full text-center text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-lg transition-colors"
          >
            Join now
          </Link>
          <Link
            to="/signin"
            onClick={closeMenu}
            className="w-full text-center text-sm font-semibold text-blue-600 border border-blue-600 px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar1;
