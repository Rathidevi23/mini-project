const express = require("express")
const {createUser, login, refreshToken} = require("../controller/user")
const router = express.Router()
const cors = require("cors")
const authentication = require("../middleware/authentication")
const User = require("../models/user")

router.use(cors())
router.post("/register", createUser)
router.post("/user/login",login)
router.post("/refresh-token",refreshToken)

router.post("/like", async (req, res) => {
    try {
        const { userId, placeId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const place = await Place.findById(placeId);
        if (!place) return res.status(404).json({ message: "Place not found" });
        if (user.likedPlaces.includes(placeId)) {
            return res.status(400).json({ message: "Place already liked" });
        }

        user.likedPlaces.push(placeId);
        await user.save();

        res.json({ message: "Place liked successfully", likedPlaces: user.likedPlaces });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/liked-places/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("likedPlaces"); 
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ likedPlaces: user.likedPlaces });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;