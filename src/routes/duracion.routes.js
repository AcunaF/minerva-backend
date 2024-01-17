const express = require("express");
const router = express.Router();
const durController = require("../controllers/duracion.controller.js");

router.get("/duracion", durController.getDuracion);

module.exports = router;


