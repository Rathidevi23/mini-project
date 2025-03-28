const mongoose = require("mongoose")
require('dotenv').config()

const mongoUri = process.env.MONGODB_URL

mongoose.connect(mongoUri, {
    tls: true, 
    serverSelectionTimeoutMS: 5000,
})
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(`MongoDB connection error: ${err}`)
})

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`)
})

module.exports = mongoose