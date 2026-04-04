import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, MessageCircle, Heart } from "lucide-react";
import heroImg from "../../assets/hero-community.jpg";
import Navbar from "./Navbar1";

const features = [
  {
    icon: <Users size={20} strokeWidth={1.8} />,
    title: "Connect with People",
    desc: "Follow professionals, send connection requests, and grow your network.",
  },
  {
    icon: <MessageCircle size={20} strokeWidth={1.8} />,
    title: "Message Directly",
    desc: "Have real conversations with your connections through private messaging.",
  },
  {
    icon: <Heart size={20} strokeWidth={1.8} />,
    title: "Share & Interact",
    desc: "Post updates, like and comment on posts from people in your network.",
  },
];

const LandingPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 gap-12 items-center py-16">
          {/* Left */}
          <div
            className={`flex flex-col gap-7 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Welcome To Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Professional
              </span>{" "}
              Community
            </h1>

            <p className="text-base font-light text-slate-500 leading-relaxed max-w-sm">
              Connect with professionals, share your work, and have real
              conversations — all in one place.
            </p>

            <div className="flex flex-col gap-3 max-w-sm">
              <Link
                to="/signup"
                className="w-full text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 py-4 rounded-full shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started — it's free
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed">
                By clicking Get Started, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  User Agreement
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                , and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Cookie Policy
                </a>
                .
              </p>

              <p className="text-sm text-slate-500">
                Already a member?{" "}
                <Link
                  to="/signin"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Right — image, constrained height */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl h-[480px]">
              <img
                src={heroImg}
                alt="Professional community"
                className="w-full h-full object-cover object-center"
              />
              {/* subtle dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />

              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 bg-slate-900/75 backdrop-blur-md text-white text-base font-bold px-4 py-2.5 rounded-xl">
                find your{" "}
                <span className="bg-blue-600 text-white text-sm font-extrabold px-2 py-0.5 rounded-md">
                  in
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            What you can do
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-10">
            Built for professionals
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-200 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
