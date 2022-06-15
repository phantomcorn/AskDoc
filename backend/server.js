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


const server = app.listen(PORT, function() {
    console.log(
        `express server running on port ${PORT}`
    )
})

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  {/* This user joins the helper room */}
  socket.on("observe threads db", (userData) => {
    socket.join("helpers room");
    console.log(userData.email + " has joined the helpers room");
  })

  {/* Send new thread to all the helpers in the helpers room */}
  socket.on("new question posted", (newThread) => {
    socket.to("helpers room").emit("new thread", newThread);
  })

  {/* Notify helpers that a thread is picked */}
  socket.on("picks a question", (data) => {
    console.log(data.email + " picked thread " + data.id);
    io.to("helpers room").emit("thread picked", data.id);
  })

});