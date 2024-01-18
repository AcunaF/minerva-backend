const express = require("express");
const router = express.Router();
const espController = require("../controllers/espacio.controller.js");

router.get("/espacio", espController.getEspacio);

module.exports = router;
