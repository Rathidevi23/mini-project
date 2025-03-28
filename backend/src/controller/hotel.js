const hotelService = require("../service/hotel");

const createHotel = async (req, res) => {
    const response = await hotelService.createHotel(req.body);
    if (response.success) {
        res.status(201).json(response);
    } else {
        res.status(400).json(response);
    }
};

const getAllHotels = async (req, res) => {
    const response = await hotelService.getAllHotels();
    res.status(response.success ? 200 : 400).json(response);
};

const getHotelsByPlaceName = async (req, res) => {
    const response = await hotelService.getHotelsByPlaceName(req.params.placeName);
    res.status(response.success ? 200 : 404).json(response);
};

const deleteHotel = async (req, res) => {
    const response = await hotelService.deleteHotel(req.params.hotelName);
    res.status(response.success ? 200 : 404).json(response);
};

module.exports = { createHotel, getAllHotels, getHotelsByPlaceName, deleteHotel };
