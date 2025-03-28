const express = require("express")
const app = express()
require("dotenv")
require("./config/database")
const userRoute = require("./routes/user")
const placeRoute = require("./routes/place")
const router = require("./routes/route")
const hotelRoute = require("./routes/route")
const {createAdminAccount} = require('./admin')

app.use(express.json())
const PORT = process.env.PORT || 5000

app.get("/", (req, res)=>{
  res.status(200).json({message: "server is running"})
})

if(require.main === module){
  app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
  })
}
app.use("/", userRoute)
app.use("/api/place", placeRoute)
app.use("/api/routes", router)
app.use("/api/hotel", hotelRoute)

createAdminAccount()

module.exports = app