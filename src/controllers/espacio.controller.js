const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getEspacio = async (req, res) => {
    try {
        const { area, subArea } = req.query; // Obtén los valores de área y subárea desde los parámetros de la consulta

        const result = await sequelize.query(
            `SELECT ESPACIO_FORMATIVO
            FROM DH_GESTUDIANTE
            WHERE trim(AREA_1) = :area AND trim(SUBAREA_1) = :subArea AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: { area, subArea },
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
    getEspacio,
};
