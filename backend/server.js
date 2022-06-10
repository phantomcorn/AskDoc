const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

connectDB()

// http://<HOST_URL>/api/threads will look up actions in noteRoute.js
app.use("/api/threads", require("./routes/threadRoute"));

app.listen(PORT, function() {
    console.log(
        "express server running on port 5000"
    )
})