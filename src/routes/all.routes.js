const express = require("express");
const router = express.Router();
const areaController = require("../controllers/area.controller.js");
const searchController = require("../controllers/buscador.controller.js");
const searchWithFilters = require("../controllers/searchWithFilters.controller.js");
const instController = require("../controllers/instutucion.controller.js");
const subAreaController = require("../controllers/subArea.controller.js");
const espController = require("../controllers/espacio.controller.js");
const geController = require("../controllers/gestion.controller.js");
const modController = require("../controllers/modalidad.controller.js");
const horController = require("../controllers/franjaHoraria.controller.js");
const durController = require("../controllers/duracion.controller.js");


router.get("/area", areaController.getArea);
router.get("/search", searchController.searchController);
router.get("/filtro", searchWithFilters.getSearchWithFilters);
router.get("/institucion", instController.getInstitutions);
router.get("/subArea", subAreaController.getSubA);
router.get("/espacio", espController.getEspacio);
router.get("/gestion", geController.getGestion);
router.get("/modalidad", modController.getModalidad);
router.get("/horarios", horController.getHorarios);
router.get("/duracion", durController.getDuracion);

