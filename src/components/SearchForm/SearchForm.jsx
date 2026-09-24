import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(query.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Search by job title or keyword"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
      />

      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
