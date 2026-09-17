# Civic Report

Civic Report is a full-stack civic issue reporting platform where citizens can submit complaints, officers can manage assigned cases, and admins can monitor departments, escalations, analytics, and system activity.

Repository: [Rahul-2513/civic_report](https://github.com/Rahul-2513/civic_report)  
Live backend: [https://civic-report-zxff.onrender.com](https://civic-report-zxff.onrender.com)

## Overview

The project is split into two applications:

- `frontend/` - React + Vite client
- `backend/` - Node.js + Express + MongoDB API

It supports three roles:

- `citizen` - report issues, track complaints, view notifications, manage profile
- `officer` - handle assigned complaints, update status, add remarks, request escalation
- `admin` - manage officers, citizens, departments, complaints, announcements, notifications, and analytics

## Core Features

- JWT-based authentication
- Role-based route protection for citizens, officers, and admins
- Complaint creation with image upload
- Complaint assignment and status tracking
- Escalation flow for unresolved complaints
- Admin dashboards and analytics
- Notifications and announcements
- Password reset via email
- Profile management with profile image upload
- Real-time support through Socket.IO

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Recharts
- Socket.IO Client

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT
- bcryptjs
- Multer + Cloudinary
- Nodemailer
- Socket.IO

## Project Structure

```text
civic_report/
├─ frontend/
│  ├─ public/
│  └─ src/
│     ├─ components/
│     ├─ layouts/
│     ├─ pages/
│     │  ├─ admin/
│     │  ├─ auth/
│     │  ├─ citizen/
│     │  └─ officer/
│     ├─ services/
│     └─ utils/
└─ backend/
   └─ src/
      ├─ config/
      ├─ controllers/
      ├─ middleware/
      ├─ models/
      ├─ routes/
      ├─ services/
      ├─ utils/
      └─ validators/
```

## Frontend Routes

### Public

- `/`
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password/:token`
- `/change-password`

### Citizen

- `/dashboard`
- `/report`
- `/track`
- `/my-complaints`
- `/departments`
- `/notifications`
- `/profile`
- `/settings`
- `/support`

### Officer

- `/officer/dashboard`
- `/officer/complaints`
- `/officer/escalation`
- `/officer/notifications`
- `/officer/reports`
- `/officer/tracking`
- `/officer/profile`
- `/officer/settings`
- `/officer/performance`
- `/officer/feedback`

### Admin

- `/admin/dashboard`
- `/admin/officers`
- `/admin/citizens`
- `/admin/departments`
- `/admin/complaints`
- `/admin/escalations`
- `/admin/analytics`
- `/admin/feedback`
- `/admin/announcements`
- `/admin/notifications`
- `/admin/auditlogs`
- `/admin/profile`
- `/admin/settings`

## API Base URL

Local development:

```text
http://localhost:5000/api
```

Production backend:

```text
https://civic-report-zxff.onrender.com/api
```

Health check:

```text
GET https://civic-report-zxff.onrender.com/
```

## Main API Modules

- `/api/auth`
- `/api/complaints`
- `/api/officer`
- `/api/admin`
- `/api/departments`
- `/api/notifications`
- `/api/announcements`
- `/api/audit-logs`
- `/api/feedback`

## Environment Variables

Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM=your_sender_email
```

Create a `.env` file inside `frontend/` with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sumit253-23/civic_report.git
cd civic_report
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

## Data Notes

- User roles: `citizen`, `officer`, `admin`
- Complaint departments currently used in the backend model:
  - `Railway`
  - `Gram Panchayat`
  - `Nagar Nigam`
- Complaint statuses include:
  - `Pending`
  - `Assigned`
  - `In Progress`
  - `Resolved`
  - `Rejected`
  - `Escalated`

## Deployment Notes

- Frontend is configured as a Vite app and includes `frontend/vercel.json` for SPA rewrites.
- Backend is deployed on Render at `https://civic-report-zxff.onrender.com`.
- Backend CORS currently allows:
  - `http://localhost:5173`
  - `http://localhost:3000`
  - any `*.vercel.app` domain

## Notes

- The frontend automatically uses `https://civic-report-zxff.onrender.com/api` in production when `VITE_API_BASE_URL` is not set.
- The app includes inactivity-based logout after 10 minutes on protected routes.
- Email delivery requires valid SMTP configuration in the backend environment.

## License

This project is currently unlicensed in the repository metadata.
