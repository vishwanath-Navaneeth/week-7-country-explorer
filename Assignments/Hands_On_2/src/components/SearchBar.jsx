import { useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // autofocus
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange(e) {
    const value = e.target.value;

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search country..."
        onChange={handleChange}
        className="border px-4 py-2 rounded-lg w-80"
      />
    </div>
  );
}

export default SearchBar;