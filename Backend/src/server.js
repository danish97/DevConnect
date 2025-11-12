import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectdb } from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

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


app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
// Connect DB and start server
const PORT = process.env.PORT || 8001;
connectdb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
