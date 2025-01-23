const express = require("express");
const blogController = require("./../controllers/blogController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", blogController.getAllBlog);
router.get("/:id", blogController.getBlogById);

router.post(
  "/create",
  authController.protect,
  blogController.uploadMiddleware,
  blogController.createBlog
);
router.patch("/:id", authController.protect, blogController.editBlogById);

router.delete("/:id", authController.protect, blogController.deleteBlogById);

module.exports = router;
