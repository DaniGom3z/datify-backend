import express from "express";
import cors from "cors";

const app = express();

app.get("/", (_, res) => {
    res.json({
        message: "Datify API running"
    });
});

app.use(cors());
app.use(express.json());

export default app