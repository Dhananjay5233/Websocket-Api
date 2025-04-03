import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;