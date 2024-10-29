import { useStore } from "@/store/store";
import { ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";

const rowsPerPage = [5, 10, 15, 20, 25, 30];
const Pagination = () => {
  const { page, setPage, limit, setLimit, total } = useStore();

  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  return (
    <div className="flex flex-row items-center justify-center space-x-2 md:justify-end">
      <div className="flex items-center">
        <p className="hidden md:block">Rows per page:</p>
        <details className="dropdown">
          <summary className="btn btn-outline btn-sm m-1 rounded-sm">
            {limit} <ChevronDown className="w-4" />
          </summary>
          <ul className="menu dropdown-content z-[1] bg-base-100 p-2 shadow">
            {Object.values(rowsPerPage).map((row) => (
              <li
                key={row}
                onClick={(e) => {
                  setLimit(row);
                  const details = (e.target as HTMLElement).closest("details");
                  if (details) details.removeAttribute("open");
                }}
              >
                <a>{row}</a>
              </li>
            ))}
          </ul>
        </details>
      </div>
      <div className="join rounded-sm">
        <button
          className="btn btn-primary join-item btn-sm"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          <ChevronsLeft className="h-5 w-5" />
        </button>
        <button className="btn join-item btn-sm">
          {" "}
          Page {page} of {totalPages}
        </button>
        <button
          className="btn btn-primary join-item btn-sm"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          <ChevronsRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
