const express = require("express");
const placeController = require("../controller/place");
const Place = require("../models/place")

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const newPlace = new Place(req.body);
        await newPlace.save();
        res.status(201).json(newPlace);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get("/all", placeController.getAllPlaces);
router.get("/search/:searchText", placeController.searchPlaces); 
router.get("/city/:cityName", placeController.getPlaceByCityName); 

module.exports = router;
