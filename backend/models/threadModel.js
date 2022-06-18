const mongoose = require("mongoose");

/*model for database
    title - title of question
    content - details of question
    owner - person asking the question
    answer - person answering the question (defaults to "")
*/
const threadSchema = {
    tag1 : String,
    tag2 : String,
    title : String,
    content : String,
    owner: String,
    answer : String,
    lat : Number,
    lng : Number
}

//REST API on ThreadsDB.threads
const Thread = mongoose.model("threads", threadSchema)

module.exports = Thread;