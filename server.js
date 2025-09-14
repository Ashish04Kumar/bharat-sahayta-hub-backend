import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import translationRoutes from "./routes/translationRoutes.js";
import { loginUser, registerUserController } from "./controllers/resgistrationUserController.js";
import bodyParser from "body-parser";
import upload from "./utils/multer.js";

dotenv.config();
connectDB();

const app = express();
// Parse normal JSON bhi agar bhejo
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", translationRoutes);
app.post("/api/v1/register-user", upload.single("profilePicture"), registerUserController);
app.post("/api/v1/login-user", loginUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
