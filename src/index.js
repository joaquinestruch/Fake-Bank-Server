const express = require("express"); 
const mongoose = require("mongoose");
const cors = require('cors');
const os = require('os');

require("dotenv").config();

const app = express(); 
const port = process.env.PORT || 3000

const userRoutes = require("./routes/user");

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


try{
        const interfaces = os.networkInterfaces();

    for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
        if (alias.family === 'IPv4' && !alias.internal) {
        console.log("IP: " + alias.address);
        }
    }
    }
}catch(error){
    console.log("No se pudo encontrar la IP")
}
