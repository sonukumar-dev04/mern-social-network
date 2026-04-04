import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

const InputField = ({ icon: Icon, error, rightElement, ...props }) => (
  <div className="relative">
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
      <Icon size={17} strokeWidth={1.8} />
    </div>
    <input
      {...props}
      className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200
        ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"
        }`}
    />
    {rightElement && (
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
        {rightElement}
      </div>
    )}
  </div>
);

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setLocalError("All fields are required!");
      return;
    }
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long!");
      return;
    }
    setLocalError(null);
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") navigate("/signin");
    });
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
          Join Pronet
        </h2>
        <p className="text-sm text-slate-400 mb-6 sm:mb-7">
          Make the most of your professional life
        </p>

        {/* Error banner */}
        {displayError && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
            <AlertCircle size={16} strokeWidth={2} className="shrink-0" />
            <span>{displayError}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <InputField
            icon={User}
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            error={displayError && !formData.name}
          />
          <InputField
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            error={displayError && !formData.email}
          />
          <InputField
            icon={AtSign}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={displayError && !formData.username}
          />
          <InputField
            icon={Lock}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password (6+ characters)"
            value={formData.password}
            onChange={handleChange}
            error={displayError && !formData.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.8} />
                ) : (
                  <Eye size={16} strokeWidth={1.8} />
                )}
              </button>
            }
          />

          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            By clicking Join, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              User Agreement
            </span>
            ,{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Privacy Policy
            </span>
            , and{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Cookie Policy
            </span>
            .
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-full shadow-md shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-200 mt-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Registering...
              </span>
            ) : (
              "Join"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-4 text-slate-500">
          Already on Pronet?{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
