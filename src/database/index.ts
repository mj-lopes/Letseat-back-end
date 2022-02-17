import mongoose from "mongoose";
require("dotenv").config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

class MongooseConnector {
  async connect(): Promise<void> {
    try {
      await mongoose
        .connect(`${MONGO_CONNECTION_STRING}`)
        .then(() => console.log("Database connected"));
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MongooseConnector();
