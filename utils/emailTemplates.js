export const verificationEmailTemplate = (verifyUrl) => `
  <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px; color:#333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <tr>
        <td style="background:#007bff; padding:20px; text-align:center; color:#fff;">
          <h1 style="margin:0; font-size:24px;">CarRental App 🚗</h1>
          <p style="margin:0; font-size:14px;">Your mobility experience starts here</p>
        </td>
      </tr>
      <tr>
        <td style="padding:30px; text-align:center;">
          <h2 style="color:#333;">Verify your email address</h2>
          <p style="font-size:16px; color:#555;">
            Thank you for registering with <strong>CarRental App</strong>.<br>
            Please confirm your email to activate your account and start booking vehicles.
          </p>
          <a href="${verifyUrl}" 
            style="display:inline-block; margin:20px 0; padding:12px 24px; background:#007bff; color:#fff; font-size:16px; font-weight:bold; text-decoration:none; border-radius:6px;">
            ✅ Verify my account
          </a>
          <p style="font-size:14px; color:#888;">
            This link will expire in <strong>1 hour</strong>.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#f9f9f9; padding:20px; text-align:center; font-size:12px; color:#777;">
          © ${new Date().getFullYear()} CarRental App. Todos los derechos reservados.<br>
          <a href="${
            process.env.FRONTEND_URL
          }/unsubscribe" style="color:#007bff; text-decoration:none;">Anular suscripción</a>
        </td>
      </tr>
    </table>
  </div>
`;
