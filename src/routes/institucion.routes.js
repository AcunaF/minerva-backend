const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/instutucion.controller.js");

router.get("/instituciones", institutionController.getInstitutions);


module.exports = router;