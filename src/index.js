const express = require("express"); 
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();

const userRoutes = require("./routes/user");


const app = express(); 
const port = process.env.PORT || 3000

// mongodb cconnection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to database MongoDB")
}).catch(error => {
    console.log({"error": error})
    return
})

//middleware
app.use(express.json());
app.use("/api", userRoutes); 
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//routes
app.get("/", (req, res) => {
    res.send("Welcome api");
}); 

app.listen(port, () => {
    console.log(`server listening ${port}`); 
})
