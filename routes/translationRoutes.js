import express from "express";
import {registerUserStep1Translation, registerHelperTranslation } from "../controllers/translationController.js";

const router = express.Router();


router.get("/register-step-1-translation", registerUserStep1Translation);
router.get("/register-helper-translation", registerHelperTranslation);

// router.get("/profile", protect, (req, res) => {
//   res.json(req.user);
// });


export default router;
