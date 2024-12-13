import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import webApiRoutes from "../backend/routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", webApiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
