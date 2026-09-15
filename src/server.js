"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const prisma_1 = __importDefault(require("./config/prisma"));
const PORT = process.env.PORT || 3000;
async function startServe() {
    try {
        await prisma_1.default.$connect();
        console.log("Database connected");
        app_1.default.listen(PORT, () => {
            console.log(`server corriendo en ${PORT}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
startServe();
