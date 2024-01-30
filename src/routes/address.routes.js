const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller.js");

router.get("/address", addressController.getAddress);

module.exports = router;