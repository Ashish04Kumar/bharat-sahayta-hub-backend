import express from "express";
import {registerUserStep1Translation, registerHelperTranslation, registerNGOTranslation, helperPrefrencesTranslation, loginScreenTranslation, dashboardScreenTranslation } from "../controllers/translationController.js";

const router = express.Router();

router.get("/register-step-1-translation", registerUserStep1Translation);
router.get("/register-helper-translation", registerHelperTranslation);
router.get("/register-ngo-translation", registerNGOTranslation);
router.get("/helper-prefrences-txt", helperPrefrencesTranslation);
router.get("/login-translation-txt", loginScreenTranslation);
router.get("/dashboard-translation", dashboardScreenTranslation);

export default router;
