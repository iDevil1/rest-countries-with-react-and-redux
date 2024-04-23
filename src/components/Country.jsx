import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Country({ theme, countryData }) {
  const location = useLocation();
  const alpha3Code = location.pathname.replace("/", "");
  const country = countryData.data.find((country) => {
    return country.alpha3Code.toLowerCase() === alpha3Code;
  });

  const navigate = useNavigate();
  function navigateHome() {
    navigate("/");
  }
  return (
    <div className="country-details">
      <button
        className={`back-button ${theme}-mode`}
        onClick={() => navigateHome()}
      >
        <svg
          fill="none"
          height="23"
          viewBox="0 0 48 48"
          width="23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m0 0h48v48h-48z" fill="#fff" fillOpacity=".01" />
          <g
            stroke={theme === "light" ? "#000" : "#fff"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path d="m5.79891 24h35.99999" />
            <path d="m17.7988 36-11.99997-12 11.99997-12" />
          </g>
        </svg>
        Back
      </button>
      <div className="details-sub-container">
        {/* <div
          className="details-flag"
          style={{
            backgroundImage: `url(${country.flags.png})`,
          }}
        ></div> */}
        <img src={country.flags.png} alt="" />
        <div className="details-info-parent">
          <div className="details-country-name">
            <h2>{country.name}</h2>
          </div>
          <div className={`details-info-container ${theme}-mode`}>
            <div>
              <div className="details-country-info-container ">
                <div className="native-name">
                  Native Name: <span>{country.nativeName}</span>
                </div>
                <div className="population">
                  Population: <span>{country.population.toLocaleString()}</span>
                </div>
                <div className="region">
                  Region: <span>{country.region}</span>
                </div>
                <div className="sub-region">
                  Sub Region: <span>{country.subregion}</span>
                </div>
                <div className="capital">
                  Capital: <span>{country.capital}</span>
                </div>
              </div>
            </div>
            <div className="details-country-info-container-2">
              <div className="top-level-domain">
                Top Level Domain:
                {country.topLevelDomain && country.topLevelDomain[0] !== "" ? (
                  country.topLevelDomain.map((domain, index) => {
                    return <span key={index}> {domain} </span>;
                  })
                ) : (
                  <span> Not found</span>
                )}
              </div>
              <div className="currencies">
                Currencies:
                {country.currencies &&
                  country.currencies.map((currency, index) => {
                    return (
                      <span key={index}>
                        {index !== country.currencies.length - 1
                          ? " " + currency.name + ", "
                          : " " + currency.name}
                      </span>
                    );
                  })}
              </div>
              <div className="languages">
                Languages:
                {country.languages &&
                  country.languages.map((language, index) => {
                    return (
                      <span key={index}>
                        {index !== country.languages.length - 1
                          ? " " + language.name + ", "
                          : " " + language.name}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="details-border-countries">
            <div>Border Countries:</div>
            <div className="border-sub-container">
              {country.borders ? (
                country.borders.map((border, index) => {
                  return (
                    <div key={index}>
                      <Link
                        className={`${theme}-mode`}
                        to={`/${border.toLowerCase()}`}
                      >
                        {border}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div>None</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Country;
