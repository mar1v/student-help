import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* left links */}
        <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
          <Link
            to="/"
            className="text-slate-100 font-semibold hover:text-indigo-400"
          >
            Запити
          </Link>

          <Link
            to="/create"
            className="text-slate-100 font-semibold hover:text-indigo-400"
          >
            Створити
          </Link>

          <Link
            to="/mine"
            className="text-slate-100 font-semibold hover:text-indigo-400"
          >
            Мої запити
          </Link>
        </div>

        {/* right auth buttons */}
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center sm:justify-end">
          {token ? (
            <button
              onClick={logout}
              className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition"
            >
              Вихід
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition text-center"
              >
                Вхід
              </Link>

              <Link
                to="/register"
                className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition text-center"
              >
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
