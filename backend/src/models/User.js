const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["citizen", "officer", "admin"],
      default: "citizen",
    },

    department: {
      type: String,
      enum: ["Railway", "Gram Panchayat", "Nagar Nigam"],
      default: null,
    },

    post: {
      type: String,
      default: null,
    },

    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      
    },

    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  settings: {
    emailNotifications: {
    type: Boolean,
    default: true,
  },

  smsNotifications: {
    type: Boolean,
    default: false,
  },

  darkMode: {
    type: Boolean,
    default: true,
  },

  complaintAutoAssign: {
    type: Boolean,
    default: true,
  },

  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
},

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
