import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    console.log("MongoDB connected!");
} catch (error) {
    console.log(error.message);
}
const db = mongoClient.db();
export default db;
