// Nav component
'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Nav = ({ onSearch }) => {
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
    <div>
      <nav className="navbar navbar-expand-lg fw-semiboldblur blur-rounded top-0 border-top z-index-3 shadow w-100  d-none d-lg-block">
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="">
              <i className="social-icons fas fa-align-right"></i>
            </span>
          </button>
          {/*start of collapse button */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link nav-item" href="/">
                  <img
                    src="https://pngimg.com/uploads/house/house_PNG55.png "
                    className="mt-3"
                    alt=""
                    width="40"
                    height="40"
                  />
                </Link>
              </li>
              <li className="nav-item m-2 ">
                <div className="input-group">
                  <Link
                    href="/Properties"
                    className="nav-link dropwdown-toggle mt-2 "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Properties
                    <span className="">
                      <FaAngleDown className=" mt-1" />
                    </span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/properties/">
                        Properties
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/apartments/">
                        Apartments
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/homes/">
                        Homes
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/commercials/">
                        Commercial
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mt-3">
                <Link className="nav-link" href="/team">
                  Agents
                </Link>
              </li>
              <li className="nav-item mt-3">
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item mt-3">
                <Link className="nav-link" href="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item mt-3">
                <Link className="nav-link" href="/about">
                  About
                </Link>
              </li>
            </ul>
            {/*search bar component 
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
                        <Link
                          href={getPropertyPageLink(suggestion.propertyType)}
                        >
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
            */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
