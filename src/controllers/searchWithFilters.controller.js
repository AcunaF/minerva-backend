const { QueryTypes } = require('sequelize');
const { sequelize } = require("../model/connect/dataBase.js");

const getSearchWithFilters = async (formData) => {
    try {
        const sqlQuery = `
            SELECT DISTINCT ID,
                INSTITUCION,
                AREA_1,
                SUBAREA_1,
                ESPACIO_FORMATIVO,
                GESTION,
                MODALIDAD,
                FRANJA_HORARIA,
                DURACION
                
FROM DH_GESTUDIANTE

WHERE (LOWER(institucion) LIKE LOWER('%' || :institucion || '%') OR :institucion IS NULL)

    AND (
    LOWER(area_1) LIKE LOWER('%' || :area|| '%') OR LOWER(subarea_1) LIKE LOWER('%' || :area || '%') OR :area IS NULL
    
    )
    
    AND (LOWER(subarea_1) LIKE LOWER('%' || :subArea || '%') OR LOWER(subarea_2) LIKE LOWER('%' || :subArea || '%') OR :subArea IS NULL)
    AND (LOWER(ESPACIO_FORMATIVO) LIKE LOWER('%' || 'CURSO' || '%') OR :espacioFormativo IS NULL)
    AND (LOWER(GESTION) LIKE LOWER('%' || 'PRIVADA' || '%') OR :gestion IS NULL)
    AND (LOWER(modalidad) LIKE LOWER('%' || :modalidad || '%') OR :modalidad IS NULL)
    AND (LOWER(franja_horaria) LIKE LOWER('%' || :franja_horaria || '%') OR :franja_horaria IS NULL)
    AND (LOWER(duracion) LIKE LOWER('%' || :duracion || '%') OR :duracion IS NULL)
        `;
        const result = await sequelize.query(sqlQuery, {
            type: QueryTypes.SELECT,
            logging: false,
            replacements: {
                institucion: formData.institucion || null,
                area: formData.area || null,
                subArea: formData.subArea || null,
                espacioFormativo: formData.espacioFormativo || null,
                gestion: formData.gestion || null,
                modalidad: formData.modalidad || null,
                franja_horaria: formData.franja_horaria || null,
                duracion: formData.duracion || null,
            },
        });

        // El resultado de la consulta está en la variable 'result'
        console.log('Resultado de la consulta:', result);
        return result;
    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    }
};

module.exports = {
    getSearchWithFilters,
};
