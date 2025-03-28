const routeService = require("../service/route");

exports.createRoute = async (req, res) => {
    try {
        const route = await routeService.createRoute(req.body);
        res.status(201).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRoutesByPlace = async (req, res) => {
    try {
        const { placeName } = req.params;
        const routes = await routeService.getRoutesByPlace(placeName);
        res.status(200).json(routes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRouteByLocations = async (req, res) => {
    try {
        const { from, to } = req.params;
        const route = await routeService.getRouteByLocations(from, to);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        const { from, to } = req.params;
        await routeService.deleteRoute(from, to);
        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
