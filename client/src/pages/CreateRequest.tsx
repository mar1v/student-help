import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../api/requests.api";

export default function CreateRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);

      if (!title || !subject) {
        toast.error("Заповни тему і предмет");
        return;
      }

      await createRequest({ title, description, subject });

      toast.success("Запит створено ✅");

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Помилка створення запиту");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 py-16 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">
          Новий запит
        </h2>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            placeholder="Тема"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            placeholder="Предмет"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />

          <div className="flex justify-end">
            <button
              disabled={loading}
              onClick={submit}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold"
            >
              {loading ? "Створюємо..." : "Створити"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
