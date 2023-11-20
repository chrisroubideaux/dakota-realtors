'use client';
// search bar component
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import apartments from '@/data/featured/apartments';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      dropdownRef.current.classList.remove('show');
    }
  };

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = (query) => {
    const filteredSuggestions = apartments.filter((apartment) =>
      apartment.propertyType.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSearch = () => {
    const filteredApartments = apartments.filter((apartment) =>
      apartment.propertyType.includes(query)
    );

    onSearch(filteredApartments);

    if (dropdownRef.current) {
      dropdownRef.current.classList.remove('show');
    }
  };

  return (
    <div className="nav justify-content-center pt-2">
      <div className="input-group mb-3 m-1" style={{ width: '20rem' }}>
        <input
          type="text"
          className="form-control text-dark fw-normal"
          aria-label="Text input with dropdown button"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
        />
        <button
          className="btn btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleSearch}
        >
          <span className="navbar-toggler-icon">
            <FaSearch className=" " />
          </span>
        </button>
        {/* <butto}
        {suggestions.length > 0 && (
          <ul
            className="dropdown-menu dropdown-menu-end show"
            ref={dropdownRef}
          >
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion.propertyType}</li>
            ))}
          </ul>
        )}
      </div> */}

        {suggestions.length > 0 && (
          <ul
            className="dropdown-menu dropdown-menu-end show"
            ref={dropdownRef}
          >
            {suggestions.map((suggestion, index) => (
              <li className="nav-item" key={index}>
                <Link href="/apartments/">
                  <li onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.propertyType}
                  </li>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
