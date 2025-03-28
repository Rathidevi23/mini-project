const Hotel = require("../models/hotel");

const createHotel = async (hotelData) => {
    try {
        const hotel = new Hotel(hotelData);
        await hotel.save();
        return { success: true, data: hotel };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const getAllHotels = async () => {
    try {
        const hotels = await Hotel.find();
        return { success: true, data: hotels };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const getHotelsByPlaceName = async (placeName) => {
    try {
        const hotels = await Hotel.find({ placeName });
        if (hotels.length === 0) {
            return { success: false, message: "No hotels found for this place" };
        }
        return { success: true, data: hotels };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const deleteHotel = async (hotelName) => {
    try {
        const deletedHotel = await Hotel.findOneAndDelete({ hotelName });
        if (!deletedHotel) {
            return { success: false, message: "Hotel not found" };
        }
        return { success: true, message: "Hotel deleted successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = { createHotel, getAllHotels, getHotelsByPlaceName, deleteHotel };
