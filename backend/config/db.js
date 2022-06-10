const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:DRP_34@cluster0.u9tmfzy.mongodb.net/ThreadsDB")
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB