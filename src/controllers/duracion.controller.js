const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getDuracion = async (req, res) => {
    try {
        const { area } = req.query;
               const result = await sequelize.query(
            `SELECT DISTINCT DURACION
                FROM DH_GESTUDIANTE
                WHERE trim(AREA_1) = :area AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: { area },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener la duración: ", error);
        res.status(500).json({ error: "Error al obtener la duración" });
    }
};

module.exports = {
    getDuracion,
};

