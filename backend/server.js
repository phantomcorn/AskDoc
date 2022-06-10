const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

connectDB()

// http://<HOST_URL>/api/threads will look up actions in noteRoute.js
app.use("/api/threads", require("./routes/threadRoute"));

app.listen(3001, function() {
    console.log(
        "express server running on port 3001"
    )
})