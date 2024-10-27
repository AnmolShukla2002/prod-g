import mongoose from "mongoose";

const connect = async (dbName) => {
    try {
        let connectionString = process.env.MONGO_URI || '';
        if(connectionString === '') {
            throw new Error('MongoDB connection string not found');
        }
        connectionString = connectionString.replace('{1}', dbName);
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("Connection error: ", error.message);
        process.exit();
    }
};

export default connect;