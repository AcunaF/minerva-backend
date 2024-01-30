const express = require("express");
const router = express.Router();
const nameController = require("../controllers/name.controller.js");

router.get("/name", nameController.getName);

module.exports = router;
