const catchAsync = require("./../utils/catchAsync");
const NewsLetter = require("./../models/newsletterModel");
const sendMail = require("../utils/mail");
const AppError = require("./../utils/appError");

// @desc  add subscriber to db and mail to admin with new subscriber

exports.addSubscriber = catchAsync(async (req, res, next) => {
  const { mail } = req.body;
  const user = await NewsLetter.findOne({ email: mail });

  if (user) {
    throw new AppError("Already subscribed.", 401);
  }

  await NewsLetter.create({
    email: mail,
  });

  const mailOptions = {
    email: process.env.ADMIN_MAIL,
    subject: "One New Subscriber alert from Digital services",
  };

  mailOptions.html = `<!DOCTYPE html>
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
      New Subscriber Alert
    </div>
    <div class="content">
      <p><span class="label">New Subscriber Email:</span> ${mail}</p>
      <p>Congratulations! A new user has subscribed to your newsletter.</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Your Company Name. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

  await sendMail(mailOptions);

  res.status(200).json({
    status: "success",
    message: "Successfully added to newsletter.",
  });
});
