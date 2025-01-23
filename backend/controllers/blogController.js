const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const Blog = require("./../models/blogModel");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  dest: "./backend/uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});
exports.uploadMiddleware = upload.single("image");

exports.getAllBlog = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});
exports.getBlogById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new appError("Blog not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});
exports.editBlogById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, desc },
    { new: true, runValidators: true }
  );

  if (!updatedBlog) {
    return next(new appError("Blog not found or could not be updated", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Blog updated successfully",
    data: {
      blog: updatedBlog,
    },
  });
});
exports.deleteBlogById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Blog.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Blog deleted successfully",
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const { title, desc } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const localImagePath = req.file.path;
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      localImagePath,
      {
        format: "jpeg",
      }
    );

    const blog = await Blog.create({
      title,
      desc,
      img: cloudinaryResponse.secure_url,
    });

    fs.unlinkSync(localImagePath);

    res.status(201).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    if (fs.existsSync(localImagePath)) {
      fs.unlinkSync(localImagePath);
    }
    next(error);
  }
});
