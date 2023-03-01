const express = require("express");
const router = express.Router();
const adminAuth = require("../config/firebaseconfig");
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  const { email, password, password_confirmation } = req.body.data;
  try {
    const userRecord = await adminAuth.getUserByEmail(email);
    return res.status(400).json({ message: "Email already in use" });
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      return res
        .status(500)
        .json({ message: "An error occurred while checking email" });
    }
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    const userResponse = await adminAuth.createUser({
      email: email,
      password: password,
      emailVerified: false,
      disabled: false,
    });
    const emaill = await adminAuth.generateEmailVerificationLink(
      userResponse.email
    );
    console.log(emaill);
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: `${userResponse.email}`,
      subject: "Test Email",
      text: `This is a test email sent with Nodemailer and Gmail!
        here is the link
        ${emaill}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Your password must contains more than 6 characters." });
  }
});

module.exports = router;
