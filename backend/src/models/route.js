const mongoose = require("../config/database");

const routeSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    transportMode: { 
        type: String, 
        required: true, 
        enum: ["Flight", "Train", "Bus", "Car", "Ship"] 
    },
    travelDate: { type: Date, required: true },
    cost: { type: Number, required: true },
    placeName: { type: String, required: true } 
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
