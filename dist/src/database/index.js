"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
class MongooseConnector {
    async connect() {
        try {
            await mongoose_1.default
                .connect(`${MONGO_CONNECTION_STRING}`)
                .then(() => console.log("Database connected"));
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new MongooseConnector();
