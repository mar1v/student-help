interface Props {
  page: number;
  pages: number;
  onPageChange: (p: number) => void;
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
  if (pages <= 1) return null;

  const visible = [];
  for (let i = page - 1; i <= page + 1; i++) {
    if (i >= 1 && i <= pages) visible.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
      >
        Prev
      </button>

      {page > 2 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700"
          >
            1
          </button>
          {page > 3 && <span className="text-slate-400">...</span>}
        </>
      )}

      {visible.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md ${
            p === page
              ? "bg-indigo-500 text-slate-900 font-bold"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          {p}
        </button>
      ))}

      {page < pages - 1 && (
        <>
          {page < pages - 2 && <span className="text-slate-400">...</span>}
          <button
            onClick={() => onPageChange(pages)}
            className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700"
          >
            {pages}
          </button>
        </>
      )}

      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
