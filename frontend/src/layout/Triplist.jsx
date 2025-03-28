import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Triplist.css';
import { IoMdSwap } from "react-icons/io"; // Icon for direction visualization

function Triplist({ data }) {
    const navigate = useNavigate();

    // Format the time in a user-friendly way (12-hour clock format)
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        let formattedHour = parseInt(hour, 10);
        const period = formattedHour >= 12 ? 'PM' : 'AM';
        
        if (formattedHour > 12) {
            formattedHour -= 12;
        } else if (formattedHour === 0) {
            formattedHour = 12;
        }

        return `${formattedHour}:${minute} ${period}`;
    };

    return (
        <div className='triplist' onClick={() => navigate(`/tripdetails/${data._id}`)}>
            {/* Trip Name */}
            <div className='tripName'>
                <h3>{data?.tripName || "Trip Details"}</h3>
            </div>
            
            {/* Locations (From and To) */}
            <div className='place'>
                <h3>{data?.origin} <span><IoMdSwap /></span> {data?.destination}</h3>
            </div>
            
            {/* Timings */}
            <div className='time'>
                <h3>{`${formatTime(data?.startTime)} - ${formatTime(data?.endTime)}`}</h3>
            </div>
            
            {/* Travel Date */}
            <div className='date'>
                <h3>{`${data?.date}`}</h3>
            </div>
            
        </div>
    );
}

export default Triplist;
