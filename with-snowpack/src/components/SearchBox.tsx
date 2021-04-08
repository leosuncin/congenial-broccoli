import * as React from 'react';

import { changeSearchTerm } from '../slices/searchSlice';
import { useAppDispatch } from '../store';

function SearchBox() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const dispatch = useAppDispatch();

  function clearSearch() {
    setSearchTerm('');
    dispatch(changeSearchTerm(''));
  }

  return (
    <div className="input-group my-2">
      <input
        type="search"
        className="form-control"
        placeholder="Search for order items..."
        aria-label="Search"
        aria-describedby="Search for order items"
        name="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="input-group-append">
        <button
          className={
            'btn btn-outline-danger ' + (searchTerm ? 'd-block' : 'd-none')
          }
          onClick={clearSearch}
          aria-label="Clear search term"
          type="button"
        >
          &times;
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => dispatch(changeSearchTerm(searchTerm))}
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
