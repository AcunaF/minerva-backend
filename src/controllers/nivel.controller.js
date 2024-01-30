const { sequelize } = require("../model/connect/dataBase");
const { QueryTypes } = require("sequelize");

const getNivel = async (req, res) => {
    try {
        const result = await sequelize.query(
            `
            SELECT NIVEL
            FROM DH_GESTUDIANTE
            WHERE 
                LOWER(NVL(TRIM(area_1), '')) LIKE LOWER('%' || TRIM(:area) || '%')
                AND LOWER(NVL(TRIM(espacio_formativo), '')) LIKE LOWER('%' || TRIM(:espacioFormativo) || '%')
                AND LOWER(NVL(TRIM(institucion), '')) LIKE LOWER('%' || TRIM(:institucion) || '%')
                AND LOWER(NVL(TRIM(gestion), '')) LIKE LOWER('%' || TRIM(:gestion) || '%')  
            ORDER BY 1;
            `,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    area: req.query.area || '',
                    espacioFormativo: req.query.espacioFormativo || '',
                    institucion: req.query.institucion || '',
                    gestion: req.query.gestion || '',
                },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener el nivel: ", error);
        res.status(500).json({ error: "Error al obtener el nivel" });
    }
};

module.exports = {
    getNivel,
};
