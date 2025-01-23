const jwt = require("jsonwebtoken");

const cookie = (res) => {
  const token = jwt.sign({ user: "Admin" }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
};

module.exports = cookie;
