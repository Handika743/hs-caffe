import { Search } from "lucide-react";

const SearchMenu = ({ searchValue, setSearchValue, onSearchClick }) => {
  return (
    <div className="flex items-center border-2 border-primary rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="p-1 font-semibold text-trirdary bg-secondary placeholder:text-trirdary w-full"
      />
      <button
        className="p-1 bg-primary/80 text-trirdary w-[30px] flex justify-center"
        onClick={onSearchClick}
      >
        <Search />
      </button>
    </div>
  );
};

export default SearchMenu;
