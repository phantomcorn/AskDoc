const mongoose = require("mongoose");

/*model for database
    tag1 - code language
    tag2 - type of problem
    title - title of question
    content - details of question
    link - any links helper may find useful (defaults to "")
    owner - person asking the question
    answer - person answering the question (defaults to "")
    lat - latitude of location
    lng - longitude of location
    askerNote - detail of location
*/
const threadSchema = {
    tag1 : String,
    tag2 : String,
    title : String,
    content : String,
    link : String,
    owner: String,
    answer : String,
    lat : Number,
    lng : Number,
    askerNote : String
}

//REST API on ThreadsDB.threads
const Thread = mongoose.model("threads", threadSchema)

module.exports = Thread;