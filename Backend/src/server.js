import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectdb } from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
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
