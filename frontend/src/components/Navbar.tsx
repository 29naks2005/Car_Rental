import { Link, useNavigate } from "react-router-dom";
import { DecodedToken } from "../types";

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user: DecodedToken | null = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white">
            DE
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Drive<span className="text-violet-600">Elite</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Browse Cars
          </Link>

          {user ? (
            <>
              {user.role === "ADMIN" && (
                <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Admin Panel
                </Link>
              )}
              {user.role === "CUSTOMER" && (
                <Link to="/my-bookings" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  My Bookings
                </Link>
              )}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm px-5 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 font-medium transition-all hover:shadow-lg hover:shadow-violet-600/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
