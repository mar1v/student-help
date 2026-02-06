import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md ">
      <div className="flex gap-4">
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

      <div className="flex gap-4">
        {token ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition"
          >
            Вихід
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition"
            >
              Вхід
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition"
            >
              Реєстрація
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
