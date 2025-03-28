import React, { useEffect, useState } from "react";
import { useTrip } from "../hook/Trip";
import axios from "axios";
import "../styles/Result.css";


const Result = () => {
    const { SearchResult } = useTrip();
    const [zoomedItem, setZoomedItem] = useState(null);
    const [liked, setLiked] = useState(false)
    

    useEffect(() => {
        console.log("Places received:", SearchResult);
    }, [SearchResult]);

    const handleLike = async (placeId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("User not logged in");
                return;
            }
    
            const likeData = { userId, placeId }; 
    
            console.log("Sending data:", likeData);
    
            const response = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(likeData),
            });
    
            const data = await response.json();
            if (response.ok) {
                setLiked(true); 
                alert("Place liked!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error liking place:", error);
        }
    };
    
    

    return (
        <div>
            <h2>Search Results</h2>
            {SearchResult ? (
                <div className="place-container">
                    <div className="place-left">
                        <img
                            src={SearchResult.imageURL || "default-image.jpg"}
                            alt={SearchResult.cityName || "Unknown"}
                            className="place-image"
                        />
                        <p className="place-description">
                            {SearchResult.description || "No description available"}
                        </p>
                    </div>
                    <div className="place-details">
                        <h3>{SearchResult.cityName || "Unknown"}, {SearchResult.country || "Unknown"}</h3>
                        <button className={`like-button ${liked ? "liked" : ""}`} onClick={() => handleLike(SearchResult._id)}>
                            {liked ? "❤️ Liked" : "🤍 Like"}
                        </button>
                        <p><strong>Available Routes:</strong> {SearchResult.routes?.join(", ") || "N/A"}</p>

                        {SearchResult.famousPlaces?.length > 0 && (
                            <>
                                <p><strong>Famous Places:</strong></p>
                                <div className="famous-places-container">
                                    {SearchResult.famousPlaces.map((place, index) => (
                                        <div key={index} className="famous-place-card">
                                            <img
                                                src={place.imageURL || "default-image.jpg"}
                                                alt={place.name}
                                                className="famous-place-image"
                                                onClick={() => setZoomedItem(place)}
                                            />
                                            <p className="famous-place-name">{place.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <p><strong>Top Hotels:</strong></p>
                        <div className="hotels-container">
                            {SearchResult.hotels?.length > 0 ? (
                                SearchResult.hotels.map((hotel, index) => (
                                    <div key={index} className="hotel-card">
                                        <h4 className="hotel-name">
                                            {hotel.hotelLink ? (
                                                <a href={hotel.hotelLink} target="_blank" rel="noopener noreferrer">
                                                    {hotel.name}
                                                </a>
                                            ) : (
                                                hotel.name
                                            )}
                                        </h4>
                                        <p className="hotel-location"><strong>Location:</strong> {hotel.location}</p>
                                        <p className="hotel-rating"><strong>Rating:</strong> {hotel.rating || "N/A"} ★</p>
                                        <p className="hotel-price">
                                            <strong>Price per night:</strong> ${hotel.pricePerNight || "N/A"}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No hotels available</p>
                            )}
                        </div>

                        {SearchResult.food?.length > 0 && (
                            <>
                                <p><strong>Famous Foods:</strong></p>
                                <div className="famous-places-container">
                                    {SearchResult.food.map((food, index) => (
                                        <div key={index} className="famous-place-card">
                                            <img
                                                src={food.imageUrl || "default-image.jpg"}
                                                alt={food.name}
                                                className="famous-place-image"
                                                onClick={() => setZoomedItem(food)}
                                            />
                                            <p className="famous-place-name">{food.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {SearchResult.shops?.length > 0 && (
                            <>
                                <p><strong>Famous Shops:</strong></p>
                                <div className="famous-places-container">
                                    {SearchResult.shops.map((shop, index) => (
                                        <div key={index} className="famous-place-card">
                                            <img
                                                src={shop.imageURL || "default-image.jpg"}
                                                alt={shop.name}
                                                className="famous-place-image"
                                                onClick={() => setZoomedItem(shop)}
                                            />
                                            <p className="famous-place-name">{shop.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : null}

            {zoomedItem && (
                <div className="image-modal" onClick={() => setZoomedItem(null)}>
                    <div className="modal-content">
                        <img src={zoomedItem.imageURL || zoomedItem.imageUrl} alt="Zoomed" className="zoomed-image" />
                        <p className="zoomed-description">{zoomedItem.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Result;
