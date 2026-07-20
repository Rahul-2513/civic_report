const express = require("express");
const cors = require("cors");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const officerRoutes = require("./routes/officerRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// Middleware
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  return /\.vercel\.app$/.test(new URL(origin).hostname);
};

// Middlewares
app.use(
  cors({
    origin(origin, callback) {
      try {
        if (isAllowedOrigin(origin)) {
          return callback(null, true);
        }

        return callback(new Error("CORS not allowed"));
      } catch (error) {
        return callback(new Error("Invalid origin"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());



// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Civic Reporting API Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/officer", officerRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/admin/departments", departmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/departments", departmentRoutes); 
app.use("/api/feedback", feedbackRoutes);


//404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});
// Global Error Middleware (Always Keep Last)
app.use(errorMiddleware);

module.exports = app;
