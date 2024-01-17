const express = require("express");
const router = express.Router();
const horController = require("../controllers/franjaHoraria.controller.js");

router.get("/horarios", horController.getHorarios);

module.exports = router;