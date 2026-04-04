import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaCommentDots, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Search, X } from "lucide-react";

import ProNetLogo from "./ProNetLogo";
import SearchDropdown from "./Navbar/Searchdropdown";
import { NavItem, MobileNavItem } from "./Navbar/Navitems";
import useSearch from "./Navbar/hooks/Usesearch";

const AVATAR_BASE = "http://localhost:4000/uploads";
const DEFAULT_AVATAR = `${AVATAR_BASE}/default_profile.jpg`;

const avatarSrc = (pic) => (pic ? `${AVATAR_BASE}/${pic}` : DEFAULT_AVATAR);

const Navbar2 = () => {
  const profile = useSelector((state) => state.auth.user);
  const {
    query,
    setQuery,
    users,
    mobileSearchOpen,
    setMobileSearchOpen,
    searchRef,
    mobileSearchRef,
    clearSearch,
  } = useSearch();

  return (
    <>
      {/* ── DESKTOP NAVBAR ───────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <ProNetLogo />
            </NavLink>

            <div ref={searchRef} className="relative w-72">
              <Search
                size={15}
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-100 pl-9 pr-4 py-2 text-sm rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
              />
              {query && <SearchDropdown users={users} onSelect={clearSearch} />}
            </div>
          </div>

          {/* Center: Nav items */}
          <div className="flex items-center gap-12">
            <NavItem to="/feed" icon={<FaHome size={20} />} label="Home" end />
            <NavItem
              to="/network"
              icon={<FaUserFriends size={20} />}
              label="Network"
            />
            <NavItem
              to="/message"
              icon={<FaCommentDots size={20} />}
              label="Message"
            />
            <NavItem
              to="/notification"
              icon={<FaBell size={20} />}
              label="Alerts"
            />
          </div>

          {/* Right: Profile */}
          <ProfileLink id={profile?._id} pic={profile?.profilePicture} />
        </div>
      </nav>

      {/* ── MOBILE TOP BAR ───────────────────────────────────────────── */}
      <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200">
          <NavLink to="/">
            <ProNetLogo />
          </NavLink>
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition"
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>

        {/* Slide-down search */}
        {mobileSearchOpen && (
          <div
            className="px-4 pb-3 border-t border-slate-100 bg-white"
            ref={mobileSearchRef}
          >
            <div className="relative mt-2">
              <Search
                size={15}
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                autoFocus
                type="text"
                placeholder="Search users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-100 pl-9 pr-4 py-2 text-sm rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
              />
              {query && users !== undefined && (
                <SearchDropdown users={users} onSelect={clearSearch} />
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE BOTTOM TAB BAR ────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 safe-area-pb">
        <div className="flex items-center justify-around h-18 px-2">
          <MobileNavItem
            to="/feed"
            icon={<FaHome size={22} />}
            label="Home"
            end
          />
          <MobileNavItem
            to="/network"
            icon={<FaUserFriends size={22} />}
            label="Network"
          />
          <MobileNavItem
            to="/message"
            icon={<FaCommentDots size={22} />}
            label="Messages"
          />
          <MobileNavItem
            to="/notification"
            icon={<FaBell size={22} />}
            label="Alerts"
          />
          <NavLink
            to={`/profile/${profile?._id}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                isActive ? "text-blue-600" : "text-gray-400 hover:text-blue-500"
              }`
            }
          >
            <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-gray-300">
              <img
                src={avatarSrc(profile?.profilePicture)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span>Profile</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

/* Small helper — desktop profile link */
const ProfileLink = ({ id, pic }) => (
  <NavLink
    to={`/profile/${id}`}
    className={({ isActive }) =>
      `relative flex flex-col items-center text-xs transition-all duration-200 pb-2 ${
        isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
      }`
    }
  >
    <div className="w-10 h-10 mt-2 rounded-full overflow-hidden ring-1 ring-gray-300 hover:ring-blue-500 transition">
      <img
        src={avatarSrc(pic)}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
    <span className="mt-1 font-medium tracking-wide">Profile</span>
  </NavLink>
);

export default Navbar2;
