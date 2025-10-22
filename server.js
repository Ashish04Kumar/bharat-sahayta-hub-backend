import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import translationRoutes from "./routes/translationRoutes.js";
import {
  loginUser,
  logoutUser,
  registerUserController,
} from "./controllers/resgistrationUserController.js";
import bodyParser from "body-parser";
import upload from "./utils/multer.js";
dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "https://bharat-sahayta-hub-frontend.vercel.app",
  "https://bharat-sahayta-hub.online",
  "http://localhost:3000",
];
app.options(
  "*",
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", translationRoutes);
app.post(
  "/api/v1/register-user",
  upload.single("profilePicture"),
  registerUserController
);
app.post("/api/v1/login-user", loginUser);
app.post("/api/v1/logout-user", logoutUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on 0.0.0.0:${PORT}`)
);
