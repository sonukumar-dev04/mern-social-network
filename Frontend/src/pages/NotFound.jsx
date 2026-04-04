import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 text-center">
        {/* 404 number */}
        <p className="text-8xl font-extrabold text-blue-100 leading-none select-none mb-2">
          404
        </p>

        {/* Icon */}
        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="11" />
              <line x1="11" y1="14" x2="11.01" y2="14" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page not found
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/feed"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-full shadow-md shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Feed
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto text-sm font-semibold text-blue-600 border border-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
