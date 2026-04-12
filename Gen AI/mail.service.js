import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER_ID,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email server is ready to send messages");
  })
  .catch((error) => {
    console.log("Error connecting to email server:", error);
  });


export const sendEmail = async (to, subject, html) => {
    console.log("EMAIL TOOL INPUT:", { to, subject, html });
  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_USER_ID,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
  return `Email sent successfully to ${to} with subject "${subject}"`;
};
export default transporter
