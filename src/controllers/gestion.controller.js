const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getGestion = async (req, res) => {
    try {
        const { area } = req.query;

        const result = await sequelize.query(
            `SELECT DISTINCT GESTION
                FROM DH_GESTUDIANTE
                WHERE trim (AREA_1) = :area  AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: { area },
                logging: false,
            }
        );
        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener ESPACIO_FORMATIVO: ", error);
        res.status(500).json({ error: "Error al obtener ESPACIO_FORMATIVO" });
    }
};

module.exports = {
    getGestion,
};
