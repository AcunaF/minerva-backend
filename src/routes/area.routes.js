const express = require("express");
const router = express.Router();
const areaController = require("../controllers/area.controller.js");

router.get("/area", areaController.getArea);


module.exports = router;