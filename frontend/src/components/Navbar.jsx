
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userInfo") || "null"
  );



  const [darkMode, setDarkMode] = useState(() => {

  return localStorage.getItem("theme") === "dark";

});

useEffect(() => {

  if (darkMode) {

    document.documentElement.classList.add("dark");

    localStorage.setItem("theme", "dark");

  } else {

    document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", "light");
  }

}, [darkMode]);


  // TOGGLE DARK MODE
  const toggleTheme = () => {

    if (darkMode) {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

    } else {

      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };




  // LOGOUT
  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");
  };




  return (

    <nav className="bg-white dark:bg-gray-900 shadow-md px-10 py-5 flex justify-between items-center">

      {/* LOGO */}
      <Link
        to="/"
        className="text-3xl font-bold text-blue-600 dark:text-white"
      >
        Resume Builder
      </Link>



      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* DARK MODE BUTTON */}
        <button
          onClick={toggleTheme}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          {darkMode ? "Light" : "Dark"}
        </button>



        {user ? (
          <>

            <Link
              to="/my-resumes"
              className="font-semibold dark:text-white"
            >
              My Resumes
            </Link>



            <Link
              to="/create-resume"
              className="font-semibold dark:text-white"
            >
              Create
            </Link>



            <button
              onClick={logoutHandler}
              className="bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Logout
            </button>

          </>
        ) : (
          <>

            <Link
              to="/login"
              className="font-semibold dark:text-white"
            >
              Login
            </Link>



            <Link
              to="/register"
              className="font-semibold dark:text-white"
            >
              Register
            </Link>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;