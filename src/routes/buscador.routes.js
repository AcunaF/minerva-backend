
const express = require("express");
const router = express.Router();
const busController = require("../controllers/buscador.controller.js");

router.get("/search", busController.searchController);

module.exports = router;
