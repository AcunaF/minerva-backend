const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const searchController = async (req, res) => {
    const { palabraClave } = req.query;

    try {
        const result = await sequelize.query(`
            SELECT *
            FROM DH_GESTUDIANTE 
            WHERE LOWER(area_1) LIKE LOWER('%${palabraClave}%')
                OR LOWER(area_2) LIKE LOWER('%${palabraClave}%')
                OR LOWER(area_3) LIKE LOWER('%${palabraClave}%')
                OR LOWER(institucion) LIKE LOWER('%${palabraClave}%')
                OR LOWER(ESPACIO_FORMATIVO) LIKE LOWER('%${palabraClave}%')
                OR LOWER(GESTION) LIKE LOWER('%${palabraClave}%')
                OR LOWER(NIVEL) LIKE LOWER('%${palabraClave}%')
                OR LOWER(nombre) LIKE LOWER('%${palabraClave}%')
                OR LOWER(modalidad) LIKE LOWER('%${palabraClave}%')
                OR LOWER(duracion) LIKE LOWER('%${palabraClave}%')
                OR LOWER(subarea_1) LIKE LOWER('%${palabraClave}%')
                OR LOWER(subarea_2) LIKE LOWER('%${palabraClave}%')`,
            {
                type: QueryTypes.SELECT,
                logging: false,
            }
        );

        res.status(200).json({ resultados: result });

    } catch (error) {
        console.error(error);

        res.status(500).send('Error en la búsqueda');
    }
};
module.exports = {
    searchController
};
