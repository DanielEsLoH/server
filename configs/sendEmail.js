import { transporter } from "./email.js";

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"CarRental App 🚗" <${process.env.BREVO_FROM}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
