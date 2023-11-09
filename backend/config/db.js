import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://Lavoro:Lavoro123@lavoro.m8wzyey.mongodb.net/Lavoro?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        
        console.log(`Error: ${error.message}`);
        process.exit(1)

    }
}


export default connectDB
