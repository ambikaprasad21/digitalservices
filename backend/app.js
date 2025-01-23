const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const blogRouter = require("./routes/blogRoute");
const contactRouter = require("./routes/contactRoute");
const subscribeRouter = require("./routes/subscriberRoute");
const adminRouter = require("./routes/adminRoute");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://digitalservices-blue.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/pm/api/v1/admin", adminRouter);
app.use("/pm/api/v1/blog", blogRouter);
app.use("/pm/api/v1/contact", contactRouter);
app.use("/pm/api/v1/subscribe", subscribeRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
