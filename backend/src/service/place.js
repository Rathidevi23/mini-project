const Place = require("../models/place")

const placeService = {
  createPlace: async (placeData) => {
    try {
      const place = new Place(placeData);
      return await place.save();
    } catch (error) {
      throw new Error(`Error creating place: ${error.message}`);
    }
  },

  getAllPlaces: async () => {
    try {
      return await Place.find();
    } catch (error) {
      throw new Error(`Error fetching places: ${error.message}`);
    }
  },

  searchPlaces: async (searchText) => {
    try {
      return await Place.find({
        $or: [
          { cityName: { $regex: searchText, $options: "i" } },
          { country: { $regex: searchText, $options: "i" } },
        ],
      });
    } catch (error) {
      throw new Error(`Error searching places: ${error.message}`);
    }
  },

  getPlaceByCityName: async (cityName) => {
    try {
      return await Place.findOne({ cityName: { $regex: `^${cityName}$`, $options: "i" } });
    } catch (error) {
      throw new Error(`Error fetching place details: ${error.message}`);
    }
  },
};

module.exports = placeService;
