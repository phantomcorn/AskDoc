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
    console.log(data.helper.email + " picked thread " + data.id);
    // Tell the asker the helper's info
    socket.to(data.askerEmail).emit("my question picked", data.helper);
    socket.to("helpers room").emit("thread picked", data.id);
  })

  {/* Gives a unique room for an asker */}
  socket.on("wait", (askerData) => {
    socket.join(askerData.email);
    console.log(askerData.email + " has been waiting for help");
  })

  {/* Notify helpers in "helpers room" that the asker cancels the question */}
  socket.on("cancel question", (data) => {
    io.to("helpers room").emit("thread picked", data.id);
  })

  // {/* Room for an asker looking at helper info */}
  // socket.on("look at helper info", (askerData) => {
  //   socket.join(askerData.email);
  // })

  // {/* Room for a helper looking at asker info */}
  // socket.on("look at asker info", (helperData) => {
  //   socket.join(helperData.email);
  // })

  // {/* Asker finishes before helper */}
  // socket.on("notify finish to helper", (helper) => {
  //   socket.to(helper.email).emit("asker finishes");
  // });

  // {/* Asker cancels before helper */}
  // socket.on("notify cancel to helper", (helper) => {
  //   socket.to(helper.email).emit("asker cancels");
  // });

  // {/* Helper finishes before asker */}
  // socket.on("notify finish to asker", (asker) => {
  //   socket.to(asker.email).emit("helper finishes");
  // });

  // {/* Helper cancels before asker */}
  // socket.on("notify cancel to asker", (asker) => {
  //   socket.to(asker.email).emit("helper cancels");
  // });

});