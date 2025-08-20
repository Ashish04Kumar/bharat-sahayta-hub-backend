import fs from "fs";
import path from "path";
import { MESSAGES } from "../constants/message.js";
MESSAGES
export const registerUserStep1Translation = (req, res) => {
  const lang = req.headers["Accept-Language"] || "en";
  const filePath = path.join(process.cwd(), "locales", "signup", "step1.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.FILE_READ_ERROR[lang] });
    }

    res.json({
      success: true,
      data: JSON.parse(data),
    });
  });
};

export const registerHelperTranslation = (req, res) => {
  const lang = req.headers["Accept-Language"] || "en";
  const filePath = path.join(process.cwd(), "locales", "signup", "register-helper-txt.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.FILE_READ_ERROR[lang] });
    }

    res.json({
      success: true,
      data: JSON.parse(data),
    });
  });
};

export const registerNGOTranslation = (req, res) => {
  const lang = req.headers["Accept-Language"] || "en";
  const filePath = path.join(process.cwd(), "locales", "signup", "register-ngo-txt.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.FILE_READ_ERROR[lang] });
    }

    res.json({
      success: true,
      data: JSON.parse(data),
    });
  });
};
