const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");


//ok
const getArea = async (req, res) => {
    try {
        const result = await sequelize.query(
            `  SELECT DISTINCT TRIM(UPPER(AREA_1)) AS area
    FROM DH_GESTUDIANTE
    WHERE AREA_1 IS NOT NULL
    UNION
    SELECT DISTINCT TRIM(UPPER(AREA_2)) AS area
    FROM DH_GESTUDIANTE
    WHERE AREA_2 IS NOT NULL
    UNION
    SELECT DISTINCT TRIM(UPPER(AREA_3)) AS area
    FROM DH_GESTUDIANTE
    WHERE AREA_3 IS NOT NULL
    order by 1`,
            {
                type: QueryTypes.SELECT,
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener instituciones: ", error);
        res.status(500).json({ error: "Error al obtener instituciones" });
    }
};


module.exports = {
    getArea,
};




