const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getModalidad = async (req, res) => {
    try {
        const { area } = req.query;
        const result = await sequelize.query(
            `SELECT distinct MODALIDAD
             FROM DH_GESTUDIANTE
             WHERE TRIM(AREA_1) = UPPER(:area) AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: { area },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener la modalidad: ", error);
        res.status(500).json({ error: "Error al obtener la modalidad" });
    }
};

module.exports = {
    getModalidad,
};


