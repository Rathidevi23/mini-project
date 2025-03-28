const express = require("express");
const routeController = require("../controller/routes");

const router = express.Router();

router.post("/create", routeController.createRoute); 
router.get("/:placeName", routeController.getRoutesByPlace); 
router.get("/:from/:to", routeController.getRouteByLocations); 
router.delete("/:from/:to", routeController.deleteRoute); 

module.exports = router;
