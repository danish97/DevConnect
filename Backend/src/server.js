import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectdb } from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV !== "production"){
  app.use(
  cors({
    origin: true, // allow same origin requests
    credentials: true,
  })
);
}


//  Handle preflight OPTIONS requests globally
app.options(/.*/, cors());

//  Body Parser
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);

const frontendPath = path.resolve("../Frontend/dist");

if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    app.get(/.*/, (req, res) =>
      res.sendFile(path.join(frontendPath, "index.html"))
    );
  } else {
    console.warn("Frontend build not found at:", frontendPath);
    console.warn("Make sure you've built the frontend (npm run build) and the 'dist' folder exists.");
  }
}

//  Connect DB and start server
const PORT = process.env.PORT || 8001;
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
