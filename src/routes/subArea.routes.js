const express = require("express");
const router = express.Router();
const subareaController = require("../controllers/subArea.controller.js");

router.get("/subArea", subareaController.subArea);


module.exports = router;