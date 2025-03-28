import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../images/logo1.webp";
import "../styles/Header.css";
import { useTrip } from "../hook/Trip";

function Header() {
  const navigate = useNavigate();
  const { userDetail, setuserDetail, setFilteredPlaces, places } = useTrip();
  const [filter, setFilter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetail");
    if (storedUser) {
      setuserDetail(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setuserDetail(null);
    localStorage.removeItem("userDetail");
    navigate("/login");
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    if (category === "India") {
      setFilteredPlaces(places.filter((place) => place.country.toLowerCase() === "india"));
    } else if (category === "international") {
      setFilteredPlaces(places.filter((place) => place.country.toLowerCase() !== "india"));
    } else {
      setFilteredPlaces(places);
    }
    setShowDropdown(false); 
  };

  return (
    <div className="header-container">
      <div className="header-title" onClick={() => navigate("/home")}>
        <img src={logo1} alt="Payanam Logo" className="logo" />
        <h1>Payanam</h1>
      </div>

      

      <div className="header-leftside">
        {!userDetail ? (
          <>
            <button onClick={() => navigate("/signup")} className="signup-button">
              Signup
            </button>
            <button onClick={() => navigate("/login")} className="login-button">
              Login
            </button>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
