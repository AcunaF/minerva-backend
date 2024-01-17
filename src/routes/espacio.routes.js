const express = require("express");
const router = express.Router();
const espController = require("../controllers/gestion.controller.js");

router.get("/espacio", espController.getGestion);

module.exports = router;
