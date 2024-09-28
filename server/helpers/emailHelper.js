const sgMail = require('@sendgrid/mail');
const crypto = require("crypto");
const User = require("../models/User");

const sendEmail = async (email, subject, text) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: 'pinnedorg@gmail.com',
        subject: subject,
        text: text,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}

const sendVerificationEmail = async (email) => {
    if (!email) {
      return { status: 400, message: "Email is required." };
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new Error("No account found with that email");
      }
  
      if (user.verified) {
        throw new Error("Email is already verified");
      }
  
      const emailVerificationToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiration = new Date(Date.now() + 7*24*60*60*1000); // 1 week
  
      user.emailVerificationToken = emailVerificationToken;
      user.tokenExpiration = tokenExpiration;
      await user.save();
  
      const emailSubject = "UW Pinned - Verify your email";
      const emailText = `Click this link to verify your email: \n${process.env.CLIENT_URL}/verify-email?token=${emailVerificationToken}`;
      await sendEmail(email, emailSubject, emailText);
  
      return "Verification email sent";
    } catch (error) {
      throw new Error(`Error sending verification email: ${error.message}`);
    }
  }

module.exports = { sendEmail, sendVerificationEmail };