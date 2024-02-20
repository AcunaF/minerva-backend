const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");
//ok
const getInstitutions = async (req, res) => {
    try {
        let { institucion } = req.query;
        institucion = institucion || null; // set default value if undefined

        let query = `
            SELECT DISTINCT institucion as display_value, institucion as return_value
            FROM DH_GESTUDIANTE
        `;
        let replacements = {};

        if (institucion) {
            query += ` WHERE trim(institucion) = :institucion`;
            replacements = { institucion };
        }

        query += ` ORDER BY 1`;

        const result = await sequelize.query(
            query,
            {
                type: QueryTypes.SELECT,
                replacements,
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
    getInstitutions,
};
