import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlaceDetails() {
    const { cityName } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/place/city/${cityName}`)
            .then(response => {
                setPlace(response.data);
            })
            .catch(error => {
                console.error('Error fetching place details:', error);
            });
    }, [cityName]);

    if (!place) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>{place.cityName}</h1>
            <img src={place.imageURL} alt={place.cityName} style={{ width: '300px', borderRadius: '10px' }} />
            <p>{place.description}</p>
            <h3>Available Routes:</h3>
            <ul>
                {place.routes.map((route, index) => (
                    <li key={index}>{route}</li>
                ))}
            </ul>
        </div>
    );
}

export default PlaceDetails;
