const placeService = require("../service/place");

const placeController = {
  createPlace: async (req, res) => {
    try {
      const place = await placeService.createPlace(req.body);
      res.status(201).json(place);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllPlaces: async (req, res) => {
    try {
      const places = await placeService.getAllPlaces();
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchPlaces: async (req, res) => {
    try {
      const searchText = req.params.searchText;
      const places = await placeService.searchPlaces(searchText);
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPlaceByCityName: async (req, res) => {
    try {
      const place = await placeService.getPlaceByCityName(req.params.cityName);
      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = placeController;
