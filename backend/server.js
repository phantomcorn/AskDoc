const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

connectDB()

// http://<HOST_URL>/api/threads to use REST API (GET,POST)
app.use("/api/threads", require("./routes/threadRoute"));
app.use("/api/accounts", require("./routes/accountRoute"));

// DEPLOYMENT
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend","build","index.html"))
    })
}


app.listen(PORT, function() {
    console.log(
        "express server running on port 5000"
    )
})