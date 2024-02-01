const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getDetails = async (req, res) => {
    try {
        const formData = req.query;
        const result = await sequelize.query(`  
  
  SELECT DISTINCT 
                  NOMBRE,
                  AREA_1,
                  SUBAREA_1,
                  INSTITUCION,
                  ESPACIO_FORMATIVO,
                  GESTION,
                  MODALIDAD,
                  DURACION,
                  FRANJA_HORARIA
    
FROM DH_GESTUDIANTE
WHERE   (:institucion IS NULL OR LOWER(INSTITUCION) LIKE LOWER('%' || :institucion || '%'))
    AND (:area IS NULL OR LOWER(AREA_1) LIKE LOWER('%' || :area || '%'))
    AND (:subarea IS NULL OR LOWER(SUBAREA_1) LIKE LOWER ('%' || :subarea || '%'))
    AND (:espacioFormativo IS NULL OR LOWER(ESPACIO_FORMATIVO) LIKE LOWER('%' || :espacioFormativo || '%'))
    AND (:gestion IS NULL OR LOWER(GESTION) LIKE LOWER('%' || :gestion || '%'))
    AND (:modalidad IS NULL OR LOWER(MODALIDAD) LIKE LOWER('%' || :modalidad || '%'))
    AND (:franjaHoraria IS NULL OR LOWER(FRANJA_HORARIA) LIKE LOWER('%' || :franjaHoraria || '%'))
    AND (:duracion IS NULL OR LOWER(DURACION) LIKE LOWER('%' || :duracion || '%'));
        `, {
            type: QueryTypes.SELECT,
            replacements: {
                institucion: formData.institucion || null,
                area: formData.area || null,
                subarea: formData.subarea || null,
                espacioFormativo: formData.espacioFormativo || null,
                gestion: formData.gestion || null,
                modalidad: formData.modalidad || null,
                franjaHoraria: formData.franjaHoraria || null,
                duracion: formData.duracion || null,
            },
            logging: false,
        });

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener filtros: ", error);
        res.status(500).json({ error: "Error al obtener filtros" });
    }
};
module.exports = {
    getDetails

};
