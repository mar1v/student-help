import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRequest, getMyRequests } from "../api/requests.api";
import Pagination from "../components/Pagination";
import { type HelpRequest } from "../types";

export default function MyRequests() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 6;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getMyRequests(
          page,
          limit,
          debouncedSearch || undefined,
        );
        setRequests(res.data.items || []);
        setPages(res.data.pagination?.pages || 1);
        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, debouncedSearch]);

  const handleDelete = (id: string) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей запит?")) return;

    deleteRequest(id)
      .then(() => setRequests((prev) => prev.filter((r) => r._id !== id)))
      .catch((err) => setError(err?.response?.data?.message || err.message));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Мої запити
        </h2>
        <div className="w-full sm:w-auto flex items-center justify-end">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Пошук за темою"
            className="w-full sm:w-64 px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-slate-300">Завантаження...</div>
      ) : error ? (
        <div className="text-red-400">Ви не авторизовані</div>
      ) : requests.length === 0 ? (
        <div className="text-slate-400">У вас ще немає запитів.</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {requests.map((r) => (
              <div
                key={r._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-4">
                  <Link
                    to={`/requests/${r._id}`}
                    className="text-lg font-bold text-slate-100 hover:text-indigo-400"
                  >
                    {r.title}
                  </Link>
                  <span className="bg-indigo-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                    {r.subject}
                  </span>
                </div>

                <p className="text-slate-300 mt-3 line-clamp-3">
                  {r.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-slate-400 text-sm">
                    {r.author?.name}
                  </span>
                  <div className="flex gap-4">
                    <Link
                      to={`/requests/${r._id}`}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-md text-sm text-indigo-300"
                    >
                      Відкрити
                    </Link>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-md text-sm text-white"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            pages={pages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
}
