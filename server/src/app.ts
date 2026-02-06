import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import requestRoutes from "./routes/request.routes";
import responseRoutes from "./routes/response.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/responses", responseRoutes);

export default app;
