import React, { useState } from 'react';

import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import { useTrip } from '../hook/Trip';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const {search}=useTrip()

    const handleSearch = async () => { 
        if (searchQuery.trim() === '') {
            alert("Enter the place name");
            return;
        }
    
        try {
            const results = await search({ place: searchQuery }); // Fetch results
            console.log("Search Results:", results); // Debugging log
    
            if (!results || (Array.isArray(results) && results.length === 0)) {
                alert("No places found.");
                return;
            }
    
            // Handle different response structures
            let placeId = Array.isArray(results) ? results[0]?.id : results?.id;
    
            navigate(`/result`); // Pass correct ID dynamically
        } catch (error) {
            console.error("Search error:", error);
            alert("Failed to fetch results.");
        }
    };
    
    
    
    

    return (
        <div className='search-container'>
            <h2>Search the place</h2>
            <input 
                type='text' 
                placeholder='Enter the place' 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}><FaSearchLocation /></button>
        </div>
    );
}

export default Search;
