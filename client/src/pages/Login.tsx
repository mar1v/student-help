import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const res = await login({ email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Вхід</h2>

        <div className="space-y-4">
          <input
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-indigo-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-indigo-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold transition"
          >
            Увійти
          </button>
        </div>
      </div>
    </div>
  );
}
