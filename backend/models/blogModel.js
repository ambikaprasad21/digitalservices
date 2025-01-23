const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog must have a title"],
    },
    desc: {
      type: String,
      required: [true, "Blog must have a description"],
    },
    img: {
      type: String,
      required: [true, "Blog must have a thumbnail"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
