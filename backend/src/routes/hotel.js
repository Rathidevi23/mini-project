const express = require("express");
const router = express.Router();
const hotelController = require("../controller/hotel");

router.post("/hotels", hotelController.createHotel);
router.get("/hotels", hotelController.getAllHotels);
router.get("/hotels/:placeName", hotelController.getHotelsByPlaceName);
router.delete("/hotels/:hotelName", hotelController.deleteHotel);

module.exports = router;
