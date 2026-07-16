import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_CONNECT_TIMEOUT_MS = Number(process.env.DB_CONNECT_TIMEOUT_MS) || 15000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CORS_ORIGIN,
  ...(process.env.CLIENT_URLS || "").split(","),
]
  .map((origin) => origin?.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
};

app.use(express.json({ limit: "1mb" }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("MargaDarshak API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not configured");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not configured");
  process.exit(1);
}

const connectToDatabase = () => {
  const connection = mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: DB_CONNECT_TIMEOUT_MS,
    connectTimeoutMS: DB_CONNECT_TIMEOUT_MS,
    socketTimeoutMS: DB_CONNECT_TIMEOUT_MS,
  });

  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(`MongoDB connection timed out after ${DB_CONNECT_TIMEOUT_MS}ms`),
      );
    }, DB_CONNECT_TIMEOUT_MS);
  });

  return Promise.race([connection, timeout]);
};

// DB Connection
connectToDatabase()
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
