const express = require("express");
const router = express.Router();
const searchWithFilters = require("../controllers/searchWithFilters.controller.js");

router.get("/filter", searchWithFilters.getSearchWithFilters);


module.exports = router;