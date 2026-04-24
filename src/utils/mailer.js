const nodemailer = require("nodemailer");

/* ======================================================
   ✅ HOTEL CONFIG
====================================================== */

const HOTEL = {
  name: "Crossroads Inn",
  tagline: "7050 Okeechobee Rd, Fort Pierce, FL 34945, USA",
  address: "7050 Okeechobee Rd, Fort Pierce, FL 34945, USA",
  phone: "+1 (772) 465-8600",
  email: "crossroadsinnflorida@gmail.com",
  website: "https://crossroadsinnfl.com",
  websiteDisplay: "crossroadsinnfl.com",
  primaryColor: "#1a3a8b",
  accentColor: "#0f2666",
};

/* ======================================================
   ✅ EMAIL WRAPPER
====================================================== */

const emailWrapper = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${HOTEL.name}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 30px rgba(0,0,0,0.12);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(160deg,${HOTEL.primaryColor} 0%,${HOTEL.accentColor} 100%);padding:40px 40px 32px;text-align:center;">
              <div style="font-size:32px;font-weight:800;color:#ffffff;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">
                ${HOTEL.name}
              </div>
              <div style="width:60px;height:2px;background:rgba(255,255,255,0.4);margin:0 auto 10px;border-radius:2px;"></div>
              <div style="font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase;">
                ${HOTEL.tagline}
              </div>
            </td>
          </tr>

          <!-- BODY -->
          ${bodyContent}

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e8e8e8;margin:0;"/>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f8f9fb;padding:28px 40px 24px;text-align:center;">
              <div style="font-size:18px;font-weight:800;color:${HOTEL.primaryColor};margin-bottom:14px;letter-spacing:1px;text-transform:uppercase;">
                ${HOTEL.name}
              </div>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:3px 0;font-size:12px;color:#666666;">
                    📍 ${HOTEL.address}
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:12px;color:#666666;">
                    📞 <a href="tel:+17724658600" style="color:#666666;text-decoration:none;">${HOTEL.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:12px;">
                    ✉️ <a href="mailto:${HOTEL.email}" style="color:${HOTEL.primaryColor};text-decoration:none;">${HOTEL.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 0;font-size:12px;">
                    🌐 <a href="${HOTEL.website}" target="_blank" style="color:${HOTEL.primaryColor};text-decoration:none;">${HOTEL.websiteDisplay}</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top:16px;font-size:11px;color:#bbbbbb;line-height:1.6;">
                © ${new Date().getFullYear()} ${HOTEL.name}. All rights reserved.<br/>
                This email was sent because you recently stayed with us.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

/* ======================================================
   ✅ EMAIL TEMPLATES
====================================================== */

// Template 1: Customer Acknowledgement (Sad feedback)
const customerFeedbackTemplate = (name, message) => emailWrapper(`
  <tr>
    <td style="padding:40px 40px 20px;">
      <div style="font-size:52px;text-align:center;margin-bottom:14px;">🙏</div>
      <h2 style="margin:0 0 8px;font-size:22px;color:#1a1a1a;text-align:center;font-weight:700;">
        We Hear You, ${name}
      </h2>
      <p style="margin:0 0 24px;font-size:14px;color:#999999;text-align:center;">
        Thank you for taking the time to share your experience with us.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 22px;">
      <div style="background:#fff5f5;border-left:4px solid ${HOTEL.primaryColor};border-radius:0 8px 8px 0;padding:18px 20px;">
        <div style="font-size:10px;font-weight:800;color:${HOTEL.primaryColor};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Your Feedback</div>
        <div style="font-size:14px;color:#444444;line-height:1.8;font-style:italic;">"${message}"</div>
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 32px;">
      <p style="margin:0 0 16px;font-size:14px;color:#555555;line-height:1.8;">
        We sincerely apologize that your stay did not meet your expectations. Your feedback is extremely valuable and will be reviewed by our management team within <strong style="color:#1a1a1a;">24 hours</strong>.
      </p>
      <div style="background:#f0faf5;border:1px solid #c3e6cb;border-radius:10px;padding:20px 22px;">
        <div style="font-size:10px;font-weight:800;color:#1e7e34;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;">Our Commitment to You</div>
        <div style="font-size:13px;color:#333333;line-height:2.0;">
          ✅ &nbsp;Management review within 24 hours<br/>
          ✅ &nbsp;We will address the issues you raised<br/>
          ✅ &nbsp;Your experience helps us improve<br/>
          ✅ &nbsp;We will follow up if needed
        </div>
      </div>
    </td>
  </tr>
`);

// Template 2: Business Notification (new feedback received)
const businessNotificationTemplate = (data) => {
  const { name, email, contact, feedbackType, platform, message } = data;
  const typeColor = feedbackType === "happy" ? "#1e7e34" : feedbackType === "sad" ? "#c0392b" : "#d68910";
  const typeBg = feedbackType === "happy" ? "#d4edda" : feedbackType === "sad" ? "#fde8e8" : "#fef9e7";
  const typeEmoji = feedbackType === "happy" ? "😊" : feedbackType === "sad" ? "😞" : "😐";

  return emailWrapper(`
  <tr>
    <td style="padding:36px 40px 20px;text-align:center;">
      <div style="font-size:48px;margin-bottom:10px;">${typeEmoji}</div>
      <h2 style="margin:0 0 6px;font-size:20px;color:#1a1a1a;font-weight:700;">New Guest Feedback</h2>
      <p style="margin:0 0 4px;font-size:12px;color:#aaaaaa;">
        ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })} EST
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 22px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;font-size:13px;">
        <tr style="background:#f7f8fa;">
          <td style="padding:11px 16px;font-weight:700;color:#888888;text-transform:uppercase;font-size:11px;letter-spacing:0.8px;width:120px;border-bottom:1px solid #eeeeee;">Guest Name</td>
          <td style="padding:11px 16px;color:#1a1a1a;font-weight:600;border-bottom:1px solid #eeeeee;">${name}</td>
        </tr>
        <tr>
          <td style="padding:11px 16px;font-weight:700;color:#888888;text-transform:uppercase;font-size:11px;letter-spacing:0.8px;border-bottom:1px solid #eeeeee;">Email</td>
          <td style="padding:11px 16px;border-bottom:1px solid #eeeeee;"><a href="mailto:${email}" style="color:${HOTEL.primaryColor};text-decoration:none;">${email}</a></td>
        </tr>
        <tr style="background:#f7f8fa;">
          <td style="padding:11px 16px;font-weight:700;color:#888888;text-transform:uppercase;font-size:11px;letter-spacing:0.8px;border-bottom:1px solid #eeeeee;">Contact</td>
          <td style="padding:11px 16px;border-bottom:1px solid #eeeeee;"><a href="tel:${contact}" style="color:#333333;text-decoration:none;">${contact}</a></td>
        </tr>
        <tr>
          <td style="padding:11px 16px;font-weight:700;color:#888888;text-transform:uppercase;font-size:11px;letter-spacing:0.8px;${platform ? "border-bottom:1px solid #eeeeee;" : ""}">Type</td>
          <td style="padding:11px 16px;${platform ? "border-bottom:1px solid #eeeeee;" : ""}">
            <span style="background:${typeBg};color:${typeColor};font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:capitalize;border:1px solid ${typeColor}33;">${feedbackType}</span>
          </td>
        </tr>
        ${platform ? `
        <tr>
          <td style="padding:11px 16px;font-weight:700;color:#888888;text-transform:uppercase;font-size:11px;letter-spacing:0.8px;">Platform</td>
          <td style="padding:11px 16px;color:#333333;text-transform:capitalize;">${platform}</td>
        </tr>` : ""}
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 34px;">
      <div style="background:#fff5f5;border-left:4px solid ${HOTEL.primaryColor};border-radius:0 8px 8px 0;padding:16px 20px;">
        <div style="font-size:10px;font-weight:800;color:${HOTEL.primaryColor};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Guest Message</div>
        <div style="font-size:14px;color:#444444;line-height:1.8;">${message}</div>
      </div>
    </td>
  </tr>
`);
};

/* ======================================================
   ✅ SEND MAIL FUNCTION
====================================================== */

exports.sendMail = async ({ to, subject, text, html }) => {
  if (!to) throw new Error("Recipient email is required");

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email configuration missing: EMAIL_USER or EMAIL_PASS not set");
    throw new Error("Email configuration is missing. Please check .env file.");
  }

  try {
    console.log("📧 Attempting to send email to:", to);
    console.log("📧 Using email account:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 30000,
      socketTimeout: 30000,
    });

    const info = await transporter.sendMail({
      from: `"Crossroads Inn" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully! Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error("❌ Error name:", error.name);
    console.error("❌ Error message:", error.message);
    if (error.code === "ECONNECTION") console.error("❌ Connection error - check network or firewall");
    if (error.code === "EAUTH") console.error("❌ Authentication error - check EMAIL_USER and EMAIL_PASS");
    if (error.code === "ENOTFOUND") console.error("❌ DNS error - check SMTP host configuration");
    throw error;
  }
};

/* ======================================================
   ✅ VERIFY EMAIL CONNECTION
====================================================== */

exports.templates = { customerFeedbackTemplate, businessNotificationTemplate };

exports.verifyConnection = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.verify();
    console.log("✅ Email server connection verified");
    return true;
  } catch (error) {
    console.error("❌ Email server connection failed:", error.message);
    return false;
  }
};