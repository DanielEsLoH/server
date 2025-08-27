import { sendEmail } from "../configs/sendEmail.js";
import { verificationEmailTemplate } from "../utils/emailTemplates.js";

export const sendVerificationEmail = async (to, verifyUrl) => {
  const subject = "🚗 Verify your email for CarRental App";
  const html = verificationEmailTemplate(verifyUrl);
  return await sendEmail(to, subject, html);
};
