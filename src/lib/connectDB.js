import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

const connection = {}

async function connectDB() {
    if(connection.isConnected) {

        console.log("DB already connected");
        return;
    }

    console.log("connecting to DB");

    try {
        
        const db = await mongoose.connect(MONGO_URL??'');

        connection.isConnected = db.connections[0].readyState;

        console.log("DB connected");

    } catch (error) {
        console.log("DB connection failed: "+ error); 
        process.exit(1);
    }
}

export default connectDB;