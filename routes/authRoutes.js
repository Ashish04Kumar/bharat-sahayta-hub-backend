import express from "express";
import { registerUserFixture } from "../controllers/authController.js";

const router = express.Router();


router.get("/register-step-1-translation", registerUserFixture);

// router.get("/profile", protect, (req, res) => {
//   res.json(req.user);
// });


export default router;
