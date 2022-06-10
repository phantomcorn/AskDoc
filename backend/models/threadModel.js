const mongoose = require("mongoose");

//model for database
const threadSchema = {
    title : String,
    content : String
}

const Thread = mongoose.model("Thread", threadSchema)

module.exports = Thread;