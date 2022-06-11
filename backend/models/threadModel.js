const mongoose = require("mongoose");

//model for database
const threadSchema = {
    title : String,
    content : String
}

//REST API on ThreadsDB.threads
const Thread = mongoose.model("threads", threadSchema)

module.exports = Thread;