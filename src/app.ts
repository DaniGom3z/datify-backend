import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import authRoutes from "./routes/auth.routes";
const app = express();

app.get("/", (_, res) => {
    res.json({
        message: "Datify API running"
    });
});

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

export default app