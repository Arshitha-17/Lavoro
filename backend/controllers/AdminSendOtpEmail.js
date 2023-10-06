import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
  auth: {
    user: 'arshithaachu165@gmail.com', 
    pass: 'lrfzeosvsbafvifq',
  },
});

// Function to send OTP to user's email
export const AdminSendOtpEmail = async (adminEmail, otp) => {

  const mailOptions = {
    from: 'arshithaachu165@gmail.com', 
    to: adminEmail, 
    subject: 'Your OTP for Password Reset', 
    text: `Your OTP for password reset is: ${otp}`, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true; 
  } catch (error) {
    console.error(error);
    return false; 
  }
};