const mongoose = require("mongoose");
const Complaint = require("./Complaint");

const feedbackSchema= new mongoose.Schema(
  {
    Complaint: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    citizen : {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating : {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    Comment : {
      type: String,
      trim : true,
      maxlength: 500,
      default:"",
    },

    satisfaction : {
      type: String,
      enum: [
         "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Unsatisfied",
        "Very Unsatisfied",
      ],
      default: "Satisfied",
    },
    issueResolved: {
      type: Boolean,
      default: true,
    },
     recommendService: {
      type: Boolean,
      default: true,
    },
     adminReply: {
      type: String,
      trim: true,
      default: "",
    },
     status: {
      type: String,
      enum: [
        "Pending",
        "Reviewed",
        "Resolved",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
  
module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);
