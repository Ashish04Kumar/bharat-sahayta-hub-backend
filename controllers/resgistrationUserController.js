import jwt from "jsonwebtoken";

import {
  FormModel,
  SeekerForm,
  HelperForm,
  NGOForm,
  SeekerHelperForm,
} from "../models/registration.modal.js";
import { uploadMedia } from "../utils/cloudinary.js";
import { MESSAGES as messages } from "../constants/message.js";

var normalizeRole = (role) => {
  if (role === "Seeker+Helper" || role === "Helper+Seeker") {
    return "Seeker+Helper";
  }
  return role;
};

export const registerUserController = async (req, res) => {
  try {
    const { role, currentstep } = req.query;
    const profilePhoto = req.file;
    const { email, isFinalStep, ...stepData } = req.body;

    if (!email) {
      return res.status(400).json({ message: messages.EMAIL_REQUIRED });
    }

    let photoURL = null;
    if (profilePhoto) {
      const cloudResponse = await uploadMedia(profilePhoto.path);
      photoURL = cloudResponse.secure_url;
    }

    let RoleModel;
    switch (normalizeRole(role)) {
      case "Helper":
        RoleModel = HelperForm;
        break;
      case "NGO":
        RoleModel = NGOForm;
        break;
      case "Seeker":
        RoleModel = SeekerForm;
        break;
      case "Seeker+Helper":
        RoleModel = SeekerHelperForm;
        break;
      default:
        RoleModel = FormModel;
    }

    const existingForm = await FormModel.findOne({ email });
    if (
      existingForm &&
      normalizeRole(existingForm.role) !== normalizeRole(role)
    ) {
      return res.status(400).json({ message: messages.EMAIL_EXISTS_USER_ROLE });
    }

    let form = await RoleModel.findOne({ email });
    if (form) {
      if ((currentstep === "2" && role === "Seeker") || form.isSaved) {
        return res.status(400).json({ message: messages.EMAIL_EXISTS });
      }

      form.set(stepData);
      if (photoURL) form.set({ profilePicture: photoURL });
      if (isFinalStep === "true") form.set({ isSaved: true });
      if (isFinalStep === "true") {
        await form.validate();
      }

      await form.save({ validateBeforeSave: isFinalStep === "true" });

      return res.status(200).json({
        message:
          isFinalStep === "true"
            ? messages.FORM_SUBMITTED
            : messages.FORM_UPDATED,
        formId: form._id,
        form,
      });
    } else {
      const newFormData = {
        email,
        ...stepData,
        ...(photoURL && { profilePicture: photoURL }),
        isSaved: isFinalStep === "true",
      };

      form = new RoleModel(newFormData);

      if (isFinalStep === "true") {
        await form.validate();
        await form.save();
      } else {
        await form.save({ validateBeforeSave: false });
      }

      return res.status(201).json({
        message:
          isFinalStep === "true"
            ? messages.FORM_SUBMITTED
            : messages.DRAFT_CREATED,
        formId: form._id,
        form,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: messages.SERVER_ERROR, error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    const existingUser = await FormModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: messages.USER_NOT_FOUND,
      });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({
        message: messages.LOGIN_FAILED,
      });
    }

    const userObj = existingUser.toObject();
    delete userObj.password;

    const token = jwt.sign(userObj, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: messages.LOGIN_SUCCESS,
      user: userObj,
    });
  } catch (err) {
    console.error("Error occurred while login:", err);
    res.status(500).json({
      message: messages.SERVER_ERROR,
      error: err.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      message: messages.LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({
      message: messages.SERVER_ERROR,
      error: err.message,
    });
  }
};
