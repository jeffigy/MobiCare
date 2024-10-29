import { statusData } from "@/lib/repairFormData";
import { useStore } from "@/store/store";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchFilter = () => {
  const { setSearch, status, setStatus } = useStore();
  const [input, setInput] = useState("");
  const [value] = useDebounce(input, 1000);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setStatus((prev: string[]) =>
      checked
        ? [...prev, value]
        : prev.filter((status: string) => status !== value),
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (setSearch) {
      setSearch(value);
    }
  }, [value]);

  return (
    <div className="mx-auto flex w-full max-w-screen-lg items-center justify-end space-x-3">
      <input
        value={input}
        onChange={handleSearchChange}
        type="text"
        className="input input-bordered w-full sm:w-auto"
        placeholder="Find Device..."
      />
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className={`btn m-1 ${status.length ? "btn-outline btn-primary" : null}`}
        >
          <Filter className="w-4" />
          <p className="hidden lg:block">Filter</p>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content z-[1] w-36 rounded-sm border border-gray-700 bg-base-100 p-2 shadow"
        >
          {Object.values(statusData).map((stat) => (
            <div className="form-control" key={stat}>
              <label className="label cursor-pointer">
                <span className="label-text">{stat}</span>
                <input
                  checked={status.includes(stat)}
                  type="checkbox"
                  className="checkbox"
                  value={stat}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
