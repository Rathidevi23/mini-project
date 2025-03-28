const Route = require("../models/route");
const Place = require("../models/place");


const createRoute = async (routeData) => {
    const { from, to, transportMode, travelDate, cost, placeName } = routeData;

    const place = await Place.findOne({ placeName });
    if (!place) {
        throw new Error("Place not found");
    }
    const newRoute = new Route({
        from,
        to,
        transportMode,
        travelDate,
        cost,
        placeName
    });

    const savedRoute = await newRoute.save();

    place.routes.push(savedRoute._id);
    await place.save();

    return savedRoute;
};


const getRoutesByPlace = async (placeName) => {
    return await Route.find({ placeName });
};

const getRouteByLocations = async (from, to) => {
    return await Route.findOne({ from, to });
};


const deleteRoute = async (from, to) => {
    const deletedRoute = await Route.findOneAndDelete({ from, to });
    if (!deletedRoute) {
        throw new Error("Route not found");
    }

    await Place.updateOne(
        { cityName: deletedRoute.placeName },
        { $pull: { routes: deletedRoute._id } }
    );

    return deletedRoute;
};

module.exports = {
    createRoute,
    getRoutesByPlace,
    getRouteByLocations,
    deleteRoute
};
