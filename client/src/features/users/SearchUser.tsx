import { useStore } from "@/store/store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchUser = () => {
  const { setSearchUser } = useStore();
  const [input, setInput] = useState("");
  const [value] = useDebounce(input, 1000);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (setSearchUser) {
      setSearchUser(value);
    }
  }, [value]);
  return (
    <label className="input input-bordered mx-auto flex w-full max-w-screen-sm items-center gap-2">
      <input
        value={input}
        type="text"
        className="grow"
        placeholder="Find user..."
        onChange={handleSearchChange}
      />
      <Search className="text-primary" />
    </label>
  );
};

export default SearchUser;
