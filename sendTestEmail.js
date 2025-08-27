import { transporter } from "./configs/email.js";

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: '"CarRental App 🚗" <daniel.esloh@gmail.com>', // 👈 tu remitente verificado en Brevo
      to: "daniel.esloh@gmail.com", // 👈 cámbialo si quieres probar con otro correo
      subject: "🚀 Prueba de correo con Brevo",
      text: "Hola! 🎉 Este es un correo de prueba enviado desde Nodemailer + Brevo.",
      html: "<h1>✅ Todo listo!</h1><p>Tu configuración con Brevo funciona perfecto 🚗</p>"
    });

    console.log("✅ Correo enviado:", info.messageId);
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
  }
}

sendTestEmail();