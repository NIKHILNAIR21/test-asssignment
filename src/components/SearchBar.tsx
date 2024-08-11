import { CiSearch } from "react-icons/ci";
import { useCelebrityContext } from "../context/CelebrityContext";


const SearchBar = () => {
  const { setSearchQuery } = useCelebrityContext();

  return (
    <div className="flex justify-start items-center gap-3 mx-auto w-[50%] p-2 border rounded">
      <CiSearch />
      <input
        type="text"
        placeholder="search here"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full outline-none"
      />
    </div>
  );
};

export default SearchBar;
