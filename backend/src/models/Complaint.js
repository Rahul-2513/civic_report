const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // Complaint Information

    title: {
      type: String,
      required: [true, "Complaint title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    department: {
      type: String,
      enum: [
        "Railway",
        "Gram Panchayat",
        "Nagar Nigam",
      ],
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    //  Images

    images: [
      {
        type: String,
      },
    ],

    //Location

    location: {
      address: {
        type: String,
        default: "",
      },

      latitude: {
        type: Number,
      },

      longitude: {
        type: Number,
      },
    },

    //Citizen

    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

   // Assigned Officer

    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

   // Complaint Status

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Resolved",
        "Rejected",
        "Escalated",
      ],
      default: "Pending",
    },

      //Priority

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

      //Officer Remarks

    remarks: [
      {
        officer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        message: {
          type: String,
          required: true,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    //Escalation

    escalationLevel: {
      type: Number,
      default: 0,
    },

    escalationReason: {
      type: String,
      default: "",
      trim: true,
    },

     //Resolution

    resolvedAt: {
      type: Date,
      default: null,
    },

    // Escalation History

escalationHistory: [
  {
    fromOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    toOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    escalatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reason: {
      type: String,
      trim: true,
    },

    escalatedAt: {
      type: Date,
      default: Date.now,
    },
  },
],

    //  Citizen Feedback

    feedbackGiven: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    
   
    //Active Complaint
   
    

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

module.exports = Complaint;