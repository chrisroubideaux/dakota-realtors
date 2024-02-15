'use client';
// search bar for the navbar
import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = (query) => {
    const allProperties = [...apartments, ...homes, ...commercials];

    const filteredSuggestions = allProperties
      .filter((property) =>
        property.propertyType.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 4);

    setSuggestions(filteredSuggestions);
  };

  const handleSearch = () => {
    const filteredApartments = apartments.filter(
      (apartment) =>
        apartment.propertyType.includes(query) ||
        apartment.location.includes(query) ||
        apartment.price.includes(query) ||
        apartment.bedrooms.includes(query) ||
        apartment.bathrooms.includes(query)
    );

    const filteredHomes = homes.filter(
      (home) =>
        home.propertyType.includes(query) ||
        home.location.includes(query) ||
        home.price.includes(query) ||
        home.bedrooms.includes(query) ||
        home.bathrooms.includes(query)
    );

    const filteredCommercials = commercials.filter((commercial) =>
      commercial.propertyType.includes(query)
    );

    const allFilteredProperties = [
      ...filteredApartments,
      ...filteredHomes,
      ...filteredCommercials,
    ];
    onSearch(allFilteredProperties);

    if (dropdownRef.current) {
      dropdownRef.current.classList.remove('show');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.propertyType);

    if (dropdownRef.current) {
      dropdownRef.current.classList.remove('show');
    }
  };

  const getPropertyPageLink = (propertyType) => {
    if (propertyType === 'Apartments') {
      return '/apartments';
    } else if (propertyType === 'Homes') {
      return '/homes';
    } else if (propertyType === 'Commercials') {
      return '/commercials';
    }

    return '/properties';
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
        {/*}
        {suggestions.length > 0 && (
          <ul
            className="dropdown-menu dropdown-menu-end show"
            ref={dropdownRef}
          >
            {suggestions.map((suggestion, index) => (
              <li className="nav-item" key={index}>
                <Link href={`/properties/${suggestion.id}`}>
                  <li onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.propertyType}
                  </li>
                </Link>
              </li>
            ))}
          </ul>
        )}
        */}
        {suggestions.length > 0 && (
          <ul
            className="dropdown-menu dropdown-menu-end show"
            ref={dropdownRef}
          >
            {suggestions.map((suggestion, index) => (
              <li className="nav-item" key={index}>
                <Link href={getPropertyPageLink(suggestion.propertyType)}>
                  <li
                    className="m-1"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="m-1 me-1">
                      {suggestion.propertyType}
                      <h6 className="">{suggestion.rooms}</h6>
                    </div>
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

export default SearchBar;
