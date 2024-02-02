const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const searchController = async (req, res) => {
    const formData = req.query;

    try {
        const result = await sequelize.query(
            `
            SELECT
                nvl(institucion, ' ')       AS institucion,
                nvl(nombre, ' ')            AS nombre,
                nvl(area_1, ' ')            AS area,
                nvl(area_2, ' ')            AS area_2,
                nvl(area_3, ' ')            AS area_3,
                nvl(subarea_1, ' ')         AS subarea,
                nvl(subarea_2, ' ')         AS subarea_2,
                nvl(espacio_formativo, ' ') AS espacio_formativo,
                nvl(gestion, ' ')           AS gestion,
                nvl(modalidad, ' ')         AS modalidad,
                nvl(duracion, ' ')          AS duracion   
            FROM
                DH_GESTUDIANTE

            WHERE    
                INSTR(TRANSLATE(NOMBRE, 'áéíóúüÁÉÍÓÚÜ', 'aeiouuAEIOUU'), NVL(UPPER(:nombre), TRANSLATE(NOMBRE, 'áéíóúüÁÉÍÓÚÜ', 'aeiouuAEIOUU'))) > 0 
                AND INSTR((ESPACIO_FORMATIVO), NVL(UPPER(:espacioFormativo), ESPACIO_FORMATIVO)) > 0 
                AND INSTR(INSTITUCION, NVL(UPPER(:institucion), INSTITUCION)) > 0

                AND (
                    (:area IS NULL OR :area = '' OR INSTR(AREA_1, :area) > 0 OR INSTR(AREA_2, :area) > 0 OR INSTR(AREA_3, :area) > 0)
                )

                AND (
                    INSTR(SUBAREA_1, NVL(:subarea, SUBAREA_1)) > 0 OR INSTR(SUBAREA_2, NVL(:subarea, SUBAREA_2)) > 0
                )

                AND INSTR(GESTION, NVL(:gestion, GESTION)) > 0
                AND INSTR(MODALIDAD, NVL(:modalidad, MODALIDAD)) > 0
                AND INSTR(DURACION, NVL(:duracion, DURACION)) > 0
    
                AND (
                    :institucion IS NOT NULL OR 
                    :espacioFormativo IS NOT NULL OR 
                    :nombre IS NOT NULL OR 
                    :area IS NOT NULL OR 
                    :subarea IS NOT NULL OR 
                    :gestion IS NOT NULL OR 
                    :duracion IS NOT NULL
                );
            `,
            {
                replacements: {
                    nombre: formData.nombre,
                    espacioFormativo: formData.espacioFormativo,
                    institucion: formData.institucion,
                    area: formData.area,
                    subarea: formData.subarea,
                    gestion:  formData.gestion,
                    modalidad: formData.modalidad,
                    duracion: formData.duracion
                },
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
