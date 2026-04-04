import { NavLink } from "react-router-dom";

export const NavItem = ({ to, icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `relative flex flex-col items-center text-xs transition-all duration-200 pb-2 ${
        isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
      }`
    }
  >
    <div>{icon}</div>
    <span className="mt-1 font-medium">{label}</span>
  </NavLink>
);

export const MobileNavItem = ({ to, icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
        isActive ? "text-blue-600" : "text-gray-400 hover:text-blue-500"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`transition-transform duration-150 ${isActive ? "scale-110" : ""}`}
        >
          {icon}
        </span>
        <span>{label}</span>
      </>
    )}
  </NavLink>
);
