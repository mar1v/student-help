import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validatePassword(p: string) {
  return p.length >= 8;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    let ok = true;
    setEmailError("");
    setPasswordError("");
    setNameError("");

    if (!name.trim()) {
      setNameError("Ім'я обов'язкове");
      ok = false;
    }
    if (!emailRe.test(email)) {
      setEmailError("Невірний email");
      ok = false;
    }
    if (!validatePassword(password)) {
      setPasswordError("Пароль має містити щонайменше 8 символів");
      ok = false;
    }

    if (!ok) return;

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (err: any) {
      setGeneralError(err?.response?.data?.message || err.message || "Error");
    }
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [generalError, setGeneralError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Реєстрація
        </h2>

        <div className="space-y-4">
          <div>
            <input
              placeholder="Імʼя"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-indigo-500 outline-none"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <div className="text-sm text-red-400 mt-1">{nameError}</div>
            )}
          </div>

          <div>
            <input
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-indigo-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="text-sm text-red-400 mt-1">{emailError}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 focus:border-indigo-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="text-sm text-red-400 mt-1">{passwordError}</div>
            )}
          </div>

          {generalError && (
            <div className="text-center text-red-400 mb-2">{generalError}</div>
          )}
          <button
            onClick={submit}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold transition"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
}
