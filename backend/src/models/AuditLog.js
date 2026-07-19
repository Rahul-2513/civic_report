const mongoose = require("mongoose");


const auditLogSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role : {
      type: String,
      enum: [
        "citizen",
        "officer",
        "admin",
      ],
      required: true,
    },

    module: {
  type: String,
  enum: [
    "Officer",
    "Citizen",
    "Complaint",
    "Department",
    "Announcement",
    "Notification",
    "System",
  ],
  required: true,
},

    complaint: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Complaint",
     default: null,
},
    action : {
      type : String,
      required : true,
      trim: true,

    },

    description: {
      type: String,
      required: true,
      trim : true,
    },

    ipAddress: {
      type: String,
      default:"",
    },
    userAgent: {
      type : String,
      default:"",
    },
    endpoint : {
      type: String,
      default: "",
    },
    method :{
      type: String,
      enum : [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
      ],
      default: "GET",
    },
  },{
    timestamps: true,
  }
);

module.exports= mongoose.model(
  "AuditLog",
  auditLogSchema
);