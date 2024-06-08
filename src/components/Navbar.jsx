import { useContext, useState } from "react";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/appContext";

const Navbar = () => {
  const { isLogged } = useContext(AppContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-kaushan text-c-birdong">I-Fit</div>
        </div>
        <button
          onClick={handleToggle}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 ${
                  location.pathname === "/" ? "text-c-orentua" : "text-gray-900"
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-c-orentua md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/kalkulatorBMIAKG"
                className={`block py-2 px-3 ${
                  location.pathname === "/kalkulatorBMIAKG"
                    ? "text-c-orentua"
                    : "text-gray-900"
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-c-orentua md:p-0`}
              >
                BMI/AKG
              </Link>
            </li>
            <li>
              <Link
                to="/kalori"
                className={`block py-2 px-3 ${
                  location.pathname === "/kalori"
                    ? "text-c-orentua"
                    : "text-gray-900"
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-c-orentua md:p-0`}
              >
                Kalori
              </Link>
            </li>
            <li>
              <Link
                to="/resep"
                className={`block py-2 px-3 ${
                  location.pathname === "/resep"
                    ? "text-c-orentua"
                    : "text-gray-900"
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-c-orentua md:p-0`}
              >
                Resep
              </Link>
            </li>
            <li>
              <Link
                to="/check-in"
                className={`block py-2 px-3 ${
                  location.pathname === "/check-in"
                    ? "text-c-orentua"
                    : "text-gray-900"
                } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-c-orentua md:p-0`}
              >
                CheckIn
              </Link>
            </li>
            {isLogged ? (
              <li>
                <Link
                  to="/profile"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  <AccountCircleOutlined
                    className="text-c-birdong"
                    style={{ fontSize: "32px" }}
                  />
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                  >
                    Masuk
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 bg-c-birdong text-white rounded-xl"
                  >
                    Daftar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;