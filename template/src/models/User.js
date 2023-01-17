const mongoose = require("mongoose");
const validator = require("validator");

// sample use-case
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "ops"],
      default: "ops",
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", AdminSchema);