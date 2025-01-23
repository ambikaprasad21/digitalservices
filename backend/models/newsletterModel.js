const mongoose = require("mongoose");

const newsLetterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema);
module.exports = NewsLetter;
