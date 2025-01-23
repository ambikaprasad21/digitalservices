const express = require("express");
const contactUsController = require("./../controllers/contactUsController");
const router = express.Router();

router.post("/create", contactUsController.addContact);

module.exports = router;
