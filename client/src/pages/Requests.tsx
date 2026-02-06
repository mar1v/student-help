import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequests } from "../api/requests.api";
import Pagination from "../components/Pagination";
import { type HelpRequest } from "../types";

export default function Requests() {
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
        setError(null);

        const res = await getRequests(
          page,
          limit,
          debouncedSearch || undefined,
        );

        setRequests(res.data.items || []);
        setPages(res.data.pagination?.pages || 1);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, debouncedSearch]);

  return (
    <div className="bg-slate-950 max-w-4xl mx-auto p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-100">
          Запити на допомогу
        </h2>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Пошук..."
            className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-slate-300">Завантаження...</div>
      ) : error ? (
        <div className="text-red-400">Помилка: {error}</div>
      ) : requests.length === 0 ? (
        <div className="text-slate-400">Немає запитів.</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {requests.map((r) => (
              <div
                key={r._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-2">
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

                <div className="flex justify-between items-center mt-4">
                  <span className="text-slate-400 text-sm">
                    {r.author?.name || "Анонім"}
                  </span>
                  <Link
                    to={`/requests/${r._id}`}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm"
                  >
                    Відкрити
                  </Link>
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
