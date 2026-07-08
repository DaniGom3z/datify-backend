import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import prisma from "./config/prisma";

const PORT = process.env.PORT || 3000;

async function startServe(){
    try {
        await prisma.$connect();
        console.log("Database connected")

        app.listen(PORT,()=>{
            console.log(`server corriendo en ${PORT}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1);        
    }
}

startServe();