"use client";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex items-center bg-white dark:bg-neutral-800 rounded-xl px-1 py-1 w-full max-w-xl shadow-md transition-colors duration-100">
    <input
      type="text"
      placeholder="Buscar productos..."
      className="bg-transparent text-black dark:text-white placeholder-gray-700 dark:placeholder-gray-400 outline-none w-full py-2 px-3 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
      value={value}
      onChange={onChange}
    />
   
  </div>
);

export default SearchBar;
