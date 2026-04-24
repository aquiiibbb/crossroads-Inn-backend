require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const feedbackRoutes = require("./Routes/feedback.Routes");

const app = express();

/* ======================================================
   ✅ CORS (SAFE & CLEAN)
====================================================== */

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps / curl)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:3000",
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      // Allow all origins in development
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ======================================================
   ✅ BODY PARSER
====================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   ✅ MONGODB CONNECTION
====================================================== */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log("✅ MongoDB already connected");
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

connectDB();

/* ======================================================
   ✅ ROUTES
====================================================== */

app.use("/api", feedbackRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Crossroads Inn Feedback API Running Successfully 🚀",
  });
});

/* ======================================================
   ✅ TEST EMAIL ENDPOINT
====================================================== */

app.get("/test-email", async (req, res) => {
  try {
    const { sendMail } = require("./utils/mailer");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email configuration missing. Check .env file",
      });
    }

    const result = await sendMail({
      to: process.env.EMAIL_USER,
      subject: "Test Email - Crossroads Inn Backend",
      text: "This is a test email from Crossroads Inn Backend.",
      html: `
        <h2>Test Email Successful! ✅</h2>
        <p>Your email configuration is working correctly.</p>
        <hr/>
        <small>Sent from Crossroads Inn Backend</small>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("❌ Test Email Failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Test email failed: " + error.message,
    });
  }
});

/* ======================================================
   ✅ ERROR HANDLING MIDDLEWARE
====================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ======================================================
   ✅ START SERVER
====================================================== */

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Crossroads Inn Backend running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("❌ Server startup failed:", error.message);
  process.exit(1);
});

module.exports = app;
