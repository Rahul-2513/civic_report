const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

  recipient: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

  sender:{
    type :mongoose.Schema.Types.ObjectId,
    ref:"User",
    default: null,
  },

  complaint:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"Complaint",
    default: null,
  },

  title:{
    type: String,
    required: true,
    trim: true,
  },
   message :{
    type: String,
    required: true,
    trim: true,
   },

   type: {
    type :String,
    enum:[
      "Complaint Assigned",
      "Complaint Updated",
      "Complaint Escalated",
      "Complaint Resolved",
      "Admin Announcement",
      "System",


    ],
    default : "System",
   },

   isRead : {
    type: Boolean,
    default : false,
   },
   readAt : {
    type : Date,
    default: null,
   },
},
{
  timestamps: true,
}
 


);
notificationSchema.index({
  recipient: 1,
  isRead: 1,
  createdAt: -1,
});



module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
