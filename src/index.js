const express = require("express"); 
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();
const userRoutes = require("./routes/user");

const app = express(); 
const port = process.env.PORT || 3000

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes); 

// mongodb cconnection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to database MongoDB")
}).catch(error => {
    console.log({"error": error})
    return
})



//routes
app.get("/", (req, res) => {
    res.send("Welcome api");
}); 

app.listen(port, () => {
    console.log(`server listening ${port}`); 
})
