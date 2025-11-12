import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectdb } from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


//  Handle preflight OPTIONS requests globally
app.options(/.*/, cors());

//  Body Parser
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);


//  Connect DB and start server
const PORT = process.env.PORT || 8001;
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
