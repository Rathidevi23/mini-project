const mongoose = require("../config/database");

const hotelSchema = new mongoose.Schema({
    hotelName: { type: String, required: true, unique: true }, 
    location: { type: String, required: true }, 
    rating: { type: Number, required: true, min: 1, max: 5 }, 
    priceRange: { type: String, required: true }, 
    bedroomTypes: [{ 
        type: String, 
        enum: ["Single", "Double", "King Size", "Family Size"], 
        required: true 
    }],
    facilities: [{ type: String, required: true }], 
    placeName: { type: String, required: true } 
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
