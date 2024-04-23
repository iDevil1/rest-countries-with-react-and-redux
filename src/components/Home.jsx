import React, { useEffect, useRef, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home({ theme, data }) {
  const [searchValue, setSearchValue] = useState("");
  const [region, setRegion] = useState("");

  const dropdownMenuRef = useRef();
  const regionElementRef = useRef();

  function showDropDown() {
    dropdownMenuRef.current.classList.toggle("visible");
    const children = dropdownMenuRef.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].onclick = (e) => {
        regionElementRef.current.innerText = e.target.innerText;
        setRegion(e.target.innerText);
      };
    }
  }

  return (
    <>
      <div className="parent-container">
        <div className="all-container">
          <div className="search-filter-container">
            <div className="search-container">
              <svg
                className="search-icon"
                fill={theme === "light" ? "#787777" : "#fff"}
                height="20"
                width="20"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 488.4 488.4"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			S381.9,104.65,381.9,203.25z"
                    />
                  </g>
                </g>
              </svg>
              <input
                value={searchValue}
                className={`${theme}-mode`}
                type="text"
                placeholder="Search for a country..."
                alt="search icon"
                onInput={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <div
                className={`sub-container ${theme}-mode`}
                onClick={() => showDropDown()}
              >
                <div className="filter-by-region" ref={regionElementRef}>
                  Filter by Region
                </div>
                <svg
                  fill={theme === "light" ? "black" : "#fff"}
                  height="25"
                  width="25"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
                >
                  <path
                    id="XMLID_225_"
                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                  />
                </svg>
                <div
                  className={`dropdown-menu ${theme}-mode`}
                  ref={dropdownMenuRef}
                >
                  <div className="div">Africa</div>
                  <div className="div">America</div>
                  <div className="div">Asia</div>
                  <div className="div">Europe</div>
                  <div className="div">Oceania</div>
                </div>
              </div>
            </div>
          </div>
          <div className={`countries-container ${theme}-mode`}>
            {data.loading ? (
              <div>Loading...</div>
            ) : (
              data.data &&
              data.data
                .filter((country) => {
                  if (
                    !country.region.toLowerCase().includes(region.toLowerCase())
                  ) {
                    return false;
                  }
                  if (!searchValue) return true;
                  if (
                    country.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim())
                  ) {
                    return true;
                  }
                })
                .map((country, index) => {
                  return (
                    <div
                      className={`country-container ${theme}-mode`}
                      key={index}
                    >
                      <Link
                        className="link"
                        to={`/${country.alpha3Code.toLowerCase()}`}
                        state={{ country: country }}
                      ></Link>
                      <div className="flag-container">
                        <img
                          src={country.flags.png}
                          alt="country-flag"
                          className="flag"
                        />
                      </div>
                      <div className="info-container">
                        <h3 className="country-name">{country.name}</h3>
                      </div>
                      <div className="sub-info-container">
                        <div className="population">
                          Population:{" "}
                          <span>
                            {country.population.toLocaleString("en-us")}
                          </span>
                        </div>
                        <div className="region">
                          Region: <span> {country.region}</span>
                        </div>
                        <div className="capital">
                          Capital: <span>{country.capital}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
