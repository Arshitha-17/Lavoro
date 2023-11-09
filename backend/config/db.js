import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        
        console.log(`Error: ${error.message}`);
        process.exit(1)

    }
}
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to the database');
//     // Continue with your server setup or other actions
//   })
//   .catch(error => {
//     console.error('Error connecting to the database:', error.message);
//   });

export default connectDB