// import mongoose from "mongoose";

//  const registrationFormSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     required: true,
//   },

//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   bio: {
//     type: String,
//   },
//   profilePicture: {
//     type: String,
//   },
//   organizationName: {
//     type: String,
//     required: true,
//   },
//   registrationNumber: {
//     type: String,
//     required: true,
//   },
//   website: {
//     type: String,
//   },
//   organizationDesc: {
//     type: String,
//   },
//   helpCategories: {
//     type: [
//       {
//         type: String,
//         enum: [
//           "healthcare",
//           "financialAid",
//           "foodHelp",
//           "emergencySos",
//           "medicines",
//           "transportPickup",
//           "crowdFunding",
//           "animalHelp",
//         ],
//       },
//     ],
//     required: true,
//   },

//   availability: {
//     type: String,
//     required: true,
//     enum: ["anytime", "Weekdays only", "weekends", "evenings", "emergency"],
//   },
//   locationRange: {
//     type: String,
//     required: true,
//     enum: [
//       "within5",
//       "within10",
//       "Within 25 km",
//       "within50",
//       "entireCity",
//       "entireState",
//       "anywhere",
//     ],
//   },
//   typeOfHelp: {
//     type: [
//       {
//         type: String,
//         enum: ["physicalAssistance", "financialSupport", "both"],
//       },
//     ],
//     required: true,
//   },
// });

// export const FormModel = mongoose.model("RegistrationForm", registrationFormSchema);

import mongoose from "mongoose";

const options = { discriminatorKey: "role", collection: "registrationForms" };

// 🔹 Base schema
const baseSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    isSaved: { type: Boolean, default: false },
  },
  options
);

export const FormModel = mongoose.model("RegistrationForm", baseSchema);

// ROLES
//seeker
const seekerSchema = new mongoose.Schema({
  bio: { type: String },
  profilePicture: { type: String },
});
export const SeekerForm = FormModel.discriminator("Seeker", seekerSchema);

// 🟢 Helper (H)
const helperSchema = new mongoose.Schema({
  bio: { type: String },
  profilePicture: { type: String },
  helpCategories: {
    type: [
      {
        type: String,
        enum: [
          "healthcare",
          "financialAid",
          "foodHelp",
          "emergencySos",
          "medicines",
          "transportPickup",
          "crowdFunding",
          "animalHelp",
        ],
      },
    ],
    required: true,
  },
  availability: {
    type: String,
    required: true,
    enum: [
      "Anytime",
      "Weekdays only",
      "Weekends only",
      "Evenings (6PM - 10PM)",
      "Emergency Only",
    ],
  },
  locationRange: {
    type: String,
    required: true,
    enum: [
      "Within 5 km",
      "Within 10 km",
      "Within 25 km",
      "Within 50 km",
      "Entire City",
      "Entire State",
      "Anywhere in India",
    ],
  },
  typeOfHelp: {
    type: [
      {
        type: String,
        enum: ["physicalAssistance", "financialSupport", "both"],
      },
    ],
    required: true,
  },
});

export const HelperForm = FormModel.discriminator("Helper", helperSchema);

// Helper + Seeker (S+H) → same as Helper

export const SeekerHelperForm = FormModel.discriminator(
  "Helper+Seeker",
  helperSchema
);

// NGO
const ngoSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  website: String,
  organizationDesc: String,
  helpCategories: {
    type: [
      {
        type: String,
        enum: [
          "healthcare",
          "financialAid",
          "foodHelp",
          "emergencySos",
          "medicines",
          "transportPickup",
          "crowdFunding",
          "animalHelp",
        ],
      },
    ],
    required: true,
  },
  availability: {
    type: String,
    required: true,
    enum: [
      "Anytime",
      "Weekdays only",
      "Weekends only",
      "Evenings (6PM - 10PM)",
      "Emergency Only",
    ],
  },
  locationRange: {
    type: String,
    required: true,
    enum: [
      "Within 5 km",
      "Within 10 km",
      "Within 25 km",
      "Within 50 km",
      "Entire City",
      "Entire State",
      "Anywhere in India",
    ],
  },
  typeOfHelp: {
    type: [
      {
        type: String,
        enum: ["physicalAssistance", "financialSupport", "both"],
      },
    ],
    required: true,
  },
});
export const NGOForm = FormModel.discriminator("NGO", ngoSchema);
