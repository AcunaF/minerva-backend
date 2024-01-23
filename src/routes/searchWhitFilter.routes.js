const express = require("express");
const router = express.Router();
const searchWithFilters = require("../controllers/searchWithFilters.controller.js");

router.get("/filtro", searchWithFilters.getSearchWithFilters);


module.exports = router;