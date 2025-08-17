import { MESSAGES } from "../constants/message.js";
import fs from "fs";
import path from "path";

export const registerUserFixture = (req, res) => {
  const lang = req.headers["Accept-Language"] || "en";
  const filePath = path.join(process.cwd(), "locales", "signup", "step1.json");
  console.log("i67ytr", filePath);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "File read error" });
    }

    res.json({
      success: true,
      data: JSON.parse(data),
    });
  });
};

// Logout
export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};
