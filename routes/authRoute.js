const express = require("express");
const router = express.Router();
const { homepage } = require("../cotrollers/authController.js");

router.post("/track", homepage);

module.exports = router;
