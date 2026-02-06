import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getUserFromToken } from "../api/axios";
import { updateRequest } from "../api/requests.api";
import type { HelpRequest } from "../types";

export default function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState<null | HelpRequest>(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSubject, setEditSubject] = useState("");

  const user = getUserFromToken();
  const currentUserId = user?.id;

  useEffect(() => {
    if (!id) return;
    api.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
      setEditTitle(res.data.title || "");
      setEditDescription(res.data.description || "");
      setEditSubject(res.data.subject || "");
    });
  }, [id]);

  const respond = async () => {
    if (!message.trim()) return;
    await api.post(`/responses/${id}`, { message });
    setMessage("");
    const res = await api.get(`/requests/${id}`);
    setRequest(res.data);
  };

  const saveEdit = async () => {
    if (!id) return;
    await updateRequest(id, {
      title: editTitle,
      description: editDescription,
      subject: editSubject,
    });
    const res = await api.get(`/requests/${id}`);
    setRequest(res.data);
    setIsEditing(false);
  };

  if (!request)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-200">
        Loading...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Request Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        {isEditing ? (
          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Тема"
            />
            <input
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              placeholder="Предмет"
            />
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Опис"
              rows={4}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={saveEdit}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold"
              >
                Зберегти
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="w-full sm:w-auto px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold"
              >
                Скасувати
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-100">
              {request.title}
            </h2>
            <div className="flex justify-between mt-2 text-slate-400 text-sm">
              <span>Предмет: {request.subject}</span>
              <span>Автор: {request.author?.name}</span>
            </div>
            <p className="mt-4 text-slate-300">{request.description}</p>
            {currentUserId && request.author?._id === currentUserId && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold"
              >
                Редагувати
              </button>
            )}
          </>
        )}
      </div>

      {/* Responses */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-100">Відповіді</h3>
        {request.responses?.length ? (
          request.responses.map((r: any) => (
            <div
              key={r._id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4"
            >
              <div className="font-semibold text-indigo-400">
                {r.author?.name}
              </div>
              <p className="text-slate-200 mt-1">{r.message}</p>
            </div>
          ))
        ) : (
          <div className="text-slate-400">Поки немає відповідей</div>
        )}
      </div>

      {/* Response Form */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-100">
          Додати відповідь
        </h3>
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-100"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Ваше повідомлення..."
        />
        <button
          onClick={respond}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold"
        >
          Відповісти
        </button>
      </div>
    </div>
  );
}
