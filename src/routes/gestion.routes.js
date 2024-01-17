const express = require("express");
const router = express.Router();
const gestController = require("../controllers/gestion.controller.js");

router.get("/gestion", gestController.getGestion);

module.exports = router;