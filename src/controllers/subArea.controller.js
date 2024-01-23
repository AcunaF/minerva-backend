const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getSubA = async (req, res) => {
    try {
        const { area } = req.query;

        const result = await sequelize.query(
            `SELECT DISTINCT SUBAREA AS VAL, SUBAREA AS DIS
            FROM (
                SELECT DISTINCT AREA_1 AS AREA, SUBAREA_1 AS SUBAREA
                FROM DH_GESTUDIANTE
                UNION
                SELECT DISTINCT AREA_2, SUBAREA_2
                FROM DH_GESTUDIANTE
                UNION
                SELECT DISTINCT AREA_3, SUBAREA_3
                FROM DH_GESTUDIANTE
            )
            WHERE AREA = :area`,
            {
                type: QueryTypes.SELECT,
                replacements: { area },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener SUBAREA: ", error);
        res.status(500).json({ error: "Error al SUBAREA" });
    }
};

module.exports = {
    getSubA,
};
