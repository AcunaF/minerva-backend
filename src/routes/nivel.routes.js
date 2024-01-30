const express = require("express");
const router = express.Router();
const levelController = require("../controllers/nivel.controller.js");

router.get("/level", levelController.getNivel);

module.exports = router;