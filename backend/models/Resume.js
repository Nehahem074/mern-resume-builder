const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: String,

    email: String,

    phone: String,

    address: String,

    summary: String,

    skills: [String],

    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        years: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);