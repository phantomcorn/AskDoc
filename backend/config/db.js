const mongoose = require("mongoose");
const dotenv = require("dotenv").config({path:__dirname+'/./../../.env'})

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB