const express = require("express");
const newsLetterController = require("./../controllers/newsLetterController");
const router = express.Router();

router.post("/", newsLetterController.addSubscriber);

module.exports = router;
