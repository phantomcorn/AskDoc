const mongoose = require("mongoose");

//model for database
const accountSchema = {
    email : String,
    password : String
}

const Account = mongoose.model("Account", accountSchema)

module.exports = Account;