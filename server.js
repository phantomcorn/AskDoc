const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({extended : false}));

//connect to mongoose

mongoose.connect("mongodb+srv://pp1120:JJ2001200!@cluster0.u9tmfzy.mongodb.net/ThreadsDB")

//require route

// http://<URL>/api/retrieve will look up actions in noteRoute.js
app.use("/api/retrieve", require("./routes/noteRoute"));

app.listen(3001, function() {
    console.log(
        "express server running on port 3001"
    )
})