const mongoose = require("../config/database");

const placeSchema = new mongoose.Schema({
    cityName: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    famousPlaces: [{ 
        name: { type: String, required: true },
        imageURL: { type: String, required: true },
        description: { type: String, required: true }
    }],
    routes: [{ type: String, enum: ["Flight", "Train", "Bus", "Car", "Ship"] }],
    hotels: [{ 
        name: { type: String, required: true, lowercase: true },
        location: { type: String, required: true, lowercase: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        
        hotelLink: { type: String, required: true }
    }],
    food: [{
        imageUrl: { type: String, required: true },
        name: { type: String, required: true }
    }],
    shops: [{ 
        name: { type: String, required: true },
        imageURL: { type: String, required: true },
        description: { type: String, required: true }
    }]
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
