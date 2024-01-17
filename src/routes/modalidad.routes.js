const express = require("express");
const router = express.Router();
const modController = require("../controllers/modalidad.controller.js");

router.get("/modalidad", modController.getModalidad);

module.exports = router;