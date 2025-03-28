import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Search from "./Search";
import "../styles/Home.css";
import { useTrip } from "../hook/Trip";

function Home() {
    const [places, setPlaces] = useState([]);
    const [likedPlaces, setLikedPlaces] = useState([]);
    const navigate = useNavigate();
    const { setSearchResult } = useTrip()
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/place/all")
            .then((response) => {
                setPlaces(response.data);
            })
            .catch((error) => {
                console.error("Error fetching places:", error);
            });
    }, []);

    const handlePlaceClick = (place) => {
        console.log(place)
        setSearchResult(place)
        navigate("/result");
    };
    const fetchLikedPlaces = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:5000/liked-places/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setLikedPlaces(data.likedPlaces);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching liked places:", error);
        }
    };

    useEffect(() => {
        fetchLikedPlaces();
    }, []);

    return (
        <div className="home">
            <div className="home-container">
                <div className="header-box">
                    <h1 className="title">
                        <div>Welcome To</div>
                        <span className="titlename">Payanam</span>
                    </h1>
                    <Search />
                </div>
                <div className="liked-places-section">
                    <h2 className="liked-title">Liked Places</h2>
                    <div className="places-grid">
                        {likedPlaces.length > 0 ? (
                            likedPlaces.map((place) => (
                                <div key={place.id} className="place-card">
                                    <img
                                        src={place.imageURL}
                                        alt={place.cityName}
                                        className="place-image"
                                        onClick={() => handlePlaceClick(place)}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <div className="place-info">
                                        <h3 className="place-title">{place.cityName}</h3>
                                        <p className="place-country">{place.country}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-places">No liked places found.</p>
                        )}
                    </div>
                </div>

                <div className="famous-places-section">
                    <h2 className="famous-title">Famous Places</h2>
                    <div className="places-grid">
                        {places.length > 0 ? (
                            places.map((place) => (
                                <div key={place.id} className="place-card">
                                    {/* Clickable Image */}
                                    <img
                                        src={place.imageURL}
                                        alt={place.cityName}
                                        className="place-image"
                                        onClick={() => handlePlaceClick(place)} // Navigate on click
                                        style={{ cursor: "pointer" }} // Show clickable cursor
                                    />
                                    <div className="place-info">
                                        <h3 className="place-title">{place.cityName}</h3>
                                        <p className="place-country">{place.country}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-places">No places found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
