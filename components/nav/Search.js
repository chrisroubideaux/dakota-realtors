// Search bar
'use client';
import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/apartments')
      .then((response) => {
        setApartmentsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });

    axios
      .get('http://localhost:3001/homes')
      .then((response) => {
        setHomesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching homes:', error);
      });

    axios
      .get('http://localhost:3001/commercials')
      .then((response) => {
        setCommercialsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching commercials:', error);
      });
  }, []);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  const [apartmentsData, setApartmentsData] = useState([]);
  const [homesData, setHomesData] = useState([]);
  const [commercialsData, setCommercialsData] = useState([]);

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = (query) => {
    const allProperties = [...apartmentsData, ...homesData, ...commercialsData];
    // const allProperties = [...apartments, ...homes, ...commercials];

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

    const filteredHomes = homes.filter((home) =>
      home.propertyType.includes(query)
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

    const location = suggestion.location;
    const price = suggestion.price;
  };

  // get property page link
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
          <span className="">
            <FaSearch className=" " />
          </span>
        </button>
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
                  ></li>
                  <li
                    className="m-1"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="m-1 me-1">
                      {suggestion.propertyType}
                      <h6 className="">{suggestion.rooms}</h6>
                      <h6 className="">{suggestion.location}</h6>
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
