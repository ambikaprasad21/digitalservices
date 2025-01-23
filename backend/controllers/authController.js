const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("./../utils/cookie");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new appError("No token found. Please log in.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user !== "Admin") {
      throw new appError("Unauthorized access. Admins only.", 403);
    }

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    throw new appError(
      "Token is invalid or expired. Please log in again.",
      401
    );
  }
});

exports.login = catchAsync(async (req, res, next) => {
  // hash of password - test
  const hashedPass =
    "$2b$12$r8YcuNpGdUd0nccldTUoe..O1Otd2smT3kxIp3TK3fHfB74gsIZ6C";

  const { password } = req.body;
  bcrypt.compare(password, hashedPass, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
      throw new appError("Invalid password", 401);
    }

    if (result) {
      console.log("Login successful");
      cookie(res);
      res.status(200).json({
        status: "success",
        user: "Admin",
      });
    } else {
      console.log("Invalid password");
      throw new appError("Some error occured", 401);
    }
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
