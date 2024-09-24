const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User model
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    hireDate: {
      type: Date,
      default: Date.now
    },
    salary: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["active", "inactive", "terminated"],
      default: "active"
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("employees", employeeSchema);
