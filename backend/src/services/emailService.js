const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(
      mailOptions
    );

    console.log(
      `Email Sent: ${info.messageId}`
    );

    return info;

  } catch (error) {
    throw new Error(
      `Email Error: ${error.message}`
    );
  }
};



const sendWelcomeEmail = async (
  userName,
  email
) => {
  const html = `
        <h2>Welcome ${userName}</h2>

        <p>
            Thank you for registering on
            <strong>Civic Issue Reporting System</strong>.
        </p>

        <p>
            Your account has been created successfully.
        </p>

        <br>

        <p>
            Regards,<br>
            Civic Issue Reporting Team
        </p>
    `;

  return sendEmail({
    to: email,
    subject: "Welcome to Civic Issue Reporting System",
    html,
  });
};



const sendResetPasswordEmail = async (
  email,
  resetLink
) => {

  const html = `
        <h2>Password Reset Request</h2>

        <p>
            Click the button below to reset your password.
        </p>

        <a
            href="${resetLink}"
            style="
                background:#0ea5e9;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:8px;
            "
        >
            Reset Password
        </a>

        <p>
            This link will expire in 15 minutes.
        </p>

        <br>

        <p>
            If you didn't request this,
            please ignore this email.
        </p>
    `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    html,
  });
};



const sendComplaintAssignedEmail = async (
  officerEmail,
  complaintTitle
) => {

  const html = `
        <h2>New Complaint Assigned</h2>

        <p>
            A new complaint has been assigned to you.
        </p>

        <p>
            <strong>${complaintTitle}</strong>
        </p>

        <p>
            Please login to the dashboard
            and take necessary action.
        </p>
    `;

  return sendEmail({
    to: officerEmail,
    subject: "New Complaint Assigned",
    html,
  });
};



const sendComplaintResolvedEmail = async (
  citizenEmail,
  complaintTitle
) => {

  const html = `
        <h2>Complaint Resolved</h2>

        <p>
            Your complaint has been resolved successfully.
        </p>

        <p>
            <strong>${complaintTitle}</strong>
        </p>

        <p>
            Please login and provide your feedback.
        </p>
    `;

  return sendEmail({
    to: citizenEmail,
    subject: "Complaint Resolved",
    html,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendComplaintAssignedEmail,
  sendComplaintResolvedEmail,
};