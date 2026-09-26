import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;

    setQuery(value);

    if (value.trim()) {
      setSearchError("");
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchError("Please enter a keyword.");
      return;
    }

    setSearchError("");
    onSearch(trimmedQuery);
  }

  return (
    <div className="search-form__wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          type="text"
          placeholder="Search by job title or keyword"
          value={query}
          onChange={handleChange}
        />

        <button className="search-form__button" type="submit">
          Search
        </button>
      </form>

      {searchError && <p className="search-form__error">{searchError}</p>}
    </div>
  );
}

export default SearchForm;
