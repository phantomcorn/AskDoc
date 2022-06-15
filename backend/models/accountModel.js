const mongoose = require("mongoose");

//model for database
const accountSchema = {
    name : String,
    email : String,
    password : String,
    computing : Boolean,
    phone : String
}

//REST API on ThreadsDB.accounts
const Account = mongoose.model("accounts", accountSchema)

module.exports = Account;