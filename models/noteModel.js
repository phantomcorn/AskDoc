const mongoose = require("mongoose");

const threadSchema = {
    title : String,
    content : String
}

const Thread = mongoose.model("Thread", threadSchema)

module.exports = Thread;