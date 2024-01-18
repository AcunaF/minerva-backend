const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getModalidad = async (req, res) => {
    try {
        const { area } = req.query; // Obtén el valor del parámetro de área desde la consulta

        const result = await sequelize.query(
            `SELECT MODALIDAD
                FROM DH_GESTUDIANTE
                WHERE trim (AREA_1) = :area AND SUBAREA_1 IS NOT NULL;`, // Utiliza :area en lugar de P53_AREA_1
            {
                type: QueryTypes.SELECT,
                replacements: { area }, // Utiliza el valor del parámetro proporcionado en la consulta
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
    getModalidad,
};
