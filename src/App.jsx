import { useState, useEffect } from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "./redux/fetchSlicer";
import Country from "./components/Country";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetch);
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const [theme, setTheme] = useState("light");
  document.body.className = `${theme}-mode`;
  const codes =
    data.data &&
    data.data.map((country) => {
      return country.alpha3Code.toLowerCase();
    });

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <>
      <header className={`${theme}-mode`}>
        <nav>
          <div className="title">Where in the world?</div>
          <div className="light-mode-container">
            <div onClick={() => changeTheme()} className="color-mode">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="70"
                height="70"
                viewBox="0 0 256 256"
                xmlSpace="preserve"
                className="moon-icon"
              >
                <defs></defs>
                <g
                  style={{
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform=" scale(1)"
                >
                  <path
                    d="M 46.607 90 c -12.452 0 -24.159 -4.849 -32.964 -13.654 c -18.176 -18.177 -18.176 -47.752 0 -65.928 c 4.469 -4.469 9.687 -7.925 15.507 -10.273 c 0.813 -0.327 1.742 -0.089 2.295 0.588 C 32 1.41 32.051 2.368 31.57 3.099 c -10.35 15.731 -8.183 36.83 5.154 50.167 l 0 0 c 13.338 13.336 34.437 15.503 50.166 5.153 c 0.73 -0.482 1.69 -0.431 2.366 0.123 c 0.678 0.555 0.915 1.484 0.588 2.296 c -2.347 5.82 -5.803 11.038 -10.272 15.508 C 70.766 85.151 59.059 90 46.607 90 z M 25.065 6.595 c -3.118 1.827 -5.994 4.051 -8.594 6.651 c -16.616 16.617 -16.616 43.654 0 60.271 C 24.521 81.567 35.223 86 46.607 86 s 22.086 -4.433 30.136 -12.482 c 2.6 -2.601 4.824 -5.477 6.651 -8.595 c -16.447 7.582 -36.384 4.285 -49.499 -8.829 l 0 0 C 20.781 42.979 17.484 23.041 25.065 6.595 z"
                    style={{
                      stroke: `${theme === "light" ? "black" : "white"}`,
                      strokeWidth: 3,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              Dark Mode
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home theme={theme} data={data} />} />
        {data.data &&
          codes.map((code, index) => (
            <Route
              key={index}
              path={`/${code}`}
              element={<Country countryData={data} theme={theme} />}
            />
          ))}
      </Routes>
    </>
  );
}

export default App;
