import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectdb } from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();

const isProduction = process.env.NODE_ENV === "production";

// ✅ Define allowed origins
const allowedOrigins = isProduction
  ? [process.env.CLIENT_URL] // production frontend
  : ["http://localhost:5173"]; // development frontend

// ✅ Setup CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow tools like Postman

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`❌ CORS blocked request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight OPTIONS requests globally
app.options(/.*/, cors());

// ✅ Body Parser
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);

// ✅ Connect DB and start server
const PORT = process.env.PORT || 8001;
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
