const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getEspacio = async (req, res) => {
    try {
        const { area } = req.query; // Obtén el valor del parámetro de área desde la consulta

        const result = await sequelize.query(
            `SELECT DISTINCT ESPACIO_FORMATIVO VAL, ESPACIO_FORMATIVO DIS
            FROM (
                -- Subconsultas aquí
            ) 
            WHERE AREA = :P53_AREA_1
            AND ESPACIO_FORMATIVO IS NOT NULL;`, // Agrega la condición para ESPACIO_FORMATIVO no sea nulo
            {
                type: QueryTypes.SELECT,
                replacements: { P53_AREA_1: area }, // Utiliza el valor del parámetro proporcionado en la consulta
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
