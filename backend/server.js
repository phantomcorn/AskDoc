const express = require("express");
const connectDB = require("./config/db")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));

connectDB()

// http://<URL>/api/retrieve will look up actions in noteRoute.js
app.use("/thread", require("./routes/threadRoute"));

app.listen(3001, function() {
    console.log(
        "express server running on port 3001"
    )
})