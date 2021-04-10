import * as React from 'react';

import { changeSearchTerm, searchTermSelector } from '../slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../store';

function SearchBox() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(searchTermSelector);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    const search = (form.elements.namedItem('search') as HTMLInputElement)
      .value;

    dispatch(changeSearchTerm(search));
  }

  function clearSearch() {
    dispatch(changeSearchTerm(''));
  }

  return (
    <form
      className="input-group my-2"
      onSubmit={handleSearch}
      onReset={clearSearch}
    >
      <input
        type="search"
        className="form-control"
        placeholder="Search for order items..."
        aria-label="Search"
        aria-describedby="Search for order items"
        name="search"
      />
      <div className="input-group-append">
        <button
          className={
            'btn btn-outline-danger ' + (searchTerm ? 'd-block' : 'd-none')
          }
          aria-label="Clear search term"
          type="reset"
        >
          &times;
        </button>
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
