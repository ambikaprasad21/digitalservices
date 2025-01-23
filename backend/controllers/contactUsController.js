const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const Contact = require("./../models/contactUsModel");
const sendMail = require("../utils/mail");

// @desc add contact to database and mail the same to admin

exports.addContact = catchAsync(async (req, res, next) => {
  const { name, email, countryCode, phone, budget, deadline, message } =
    req.body;

  await Contact.create({
    name,
    email,
    countryCode,
    phone,
    budget,
    deadline,
    message,
  });

  const mailOptions = {
    email: process.env.ADMIN_MAIL,
    subject: "One new contact from Digital Services",
  };

  mailOptions.html = `
  <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #e89509;
      color: #ffffff;
      padding: 15px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content p {
      margin: 10px 0;
    }
    .label {
      font-weight: bold;
      color: #555555;
    }
    .footer {
      text-align: center;
      padding: 10px;
      color: #888888;
      font-size: 12px;
      border-top: 1px solid #dddddd;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      New Contact Information
    </div>
    <div class="content">
      <p><span class="label">Name:</span> ${name}</p>
      <p><span class="label">Email:</span> ${email}</p>
      <p><span class="label">Phone:</span> ${countryCode}-${phone}</p>
      <p><span class="label">Budget:</span> ₹${budget}</p>
      <p><span class="label">Deadline:</span> ${new Date(
        deadline
      ).toLocaleDateString()}</p>
      ${
        message.length > 0
          ? `<p><span class="label">Message:</span> ${message}</p>`
          : ``
      }
      
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Digital Services. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;

  await sendMail(mailOptions);

  res.status(200).json({
    status: "success",
    message: "Successfully added your query.",
  });
});
