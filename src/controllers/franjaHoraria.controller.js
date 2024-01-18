const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getHorarios = async (req, res) => {
    try {
        const { keyword } = req.query; // Obtén la palabra clave desde los parámetros de la consulta

        const result = await sequelize.query(
            `SELECT FRANJA_HORARIA
                FROM DH_GESTUDIANTE
                WHERE trim(AREA_1) = :keyword AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: { keyword },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener FRANJA_HORARIA: ", error);
        res.status(500).json({ error: "Error al obtener FRANJA_HORARIA" });
    }
};

module.exports = {
    getHorarios,
};
