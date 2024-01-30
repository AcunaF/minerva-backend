const { sequelize } = require("../model/connect/dataBase");
const { QueryTypes } = require("sequelize");

const getName = async (req, res) => {
    try {
        const result = await sequelize.query(
            `
            SELECT DISTINCT NOMBRE
            FROM DH_GESTUDIANTE
            WHERE 
                LOWER(NVL(TRIM(institucion), '')) LIKE LOWER('%' || TRIM(:institucion) || '%')
                AND LOWER(NVL(TRIM(area_1), '')) LIKE LOWER('%' || TRIM(:area) || '%')
                AND LOWER(NVL(TRIM(subarea_1), '')) LIKE LOWER('%' || TRIM(:subarea) || '%') 
                AND LOWER(NVL(TRIM(espacio_formativo), '')) LIKE LOWER('%' || TRIM(:espacioFormativo) || '%')
            ORDER BY 1;
            `,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    institucion: req.query.institucion || '',
                    area: req.query.area || '',
                    subarea: req.query.subarea || '',
                    espacioFormativo: req.query.espacioFormativo || '',
                },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener el nombre: ", error);
        res.status(500).json({ error: "Error al obtener el nombre" });
    }
};

module.exports = {
    getName,
};
