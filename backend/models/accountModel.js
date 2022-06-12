const mongoose = require("mongoose");

//model for database
const accountSchema = {
    email : String,
    password : String
}

//REST API on ThreadsDB.accounts
const Account = mongoose.model("accounts", accountSchema)

module.exports = Account;