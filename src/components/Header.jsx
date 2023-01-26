import React, { useState } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <button
        onClick={ () => setShowSearchBar(!showSearchBar) }
        data-testid="search-top-btn"
      >
        Search
      </button>
      {
        showSearchBar && <SearchBar />
      }
    </header>
  );
}
