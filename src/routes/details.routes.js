const express = require("express");
const router = express.Router();
const detailController = require("../controllers/details.controller.js");

router.get("/details", detailController.getDetails);

module.exports = router;

