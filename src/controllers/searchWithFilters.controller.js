const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");
const getSearchWithFilters = async (req, res) => {
    try {
        const formData = req.query;
        console.log('formDataBAck',formData)
        const result = await sequelize.query(`
            SELECT  
                nombre,
                institucion, 
                nivel,
                area_1, 
                subarea_1, 
                espacio_formativo, 
                gestion, 
                modalidad, 
                franja_horaria, 
                duracion
                
            FROM DH_GESTUDIANTE
            
            WHERE            
                LOWER (nombre) LIKE LOWER('%' || :nombre || '%')
                AND LOWER(institucion) LIKE LOWER('%' || :institucion || '%')
                AND LOWER(nivel) LIKE LOWER('%' || :nivel || '%')                
                AND (:area IS NULL OR (LOWER(AREA_1) LIKE LOWER('%' || :area || '%') OR LOWER(AREA_2) LIKE LOWER('%' || :area || '%') OR LOWER(AREA_3) LIKE LOWER('%' || :area || '%')))                              
                AND (:subarea IS NULL OR (LOWER(SUBAREA_1) LIKE LOWER('%' || :subarea || '%') OR LOWER(SUBAREA_2) LIKE LOWER('%' || :subarea || '%')))
                AND LOWER(espacio_formativo) LIKE LOWER('%' || :espacioFormativo || '%')    
           /*       AND LOWER(gestion) LIKE LOWER('%' || :gestion || '%')
                AND LOWER(modalidad) LIKE LOWER('%' || :modalidad || '%')
                 AND LOWER(franja_horaria) LIKE LOWER('%' || :franjaHoraria || '%')
           AND LOWER(espacio_formativo) LIKE LOWER('%' || :espacioFormativo || '%')
                AND LOWER(duracion) LIKE LOWER('%' || :duracion || '%')*/
            /*    
            E 
                
                AND LOWER(area_2) LIKE LOWER('%' || :area || '%')                                         

                AND LOWER(modalidad) LIKE LOWER('%' || :modalidad || '%')
                OR LOWER(subarea_2) LIKE LOWER('%' || :subarea || '%'))
                AND LOWER(nivel) LIKE LOWER('%' || :nivel || '%')              
                AND LOWER(franja_horaria) LIKE LOWER('%' || :franjaHoraria || '%')
                AND LOWER(duracion) LIKE LOWER('%' || :duracion || '%') */
            ORDER BY 1
        `, {
            type: QueryTypes.SELECT,
            replacements: {
                nombre: formData.nombre || null,
                nivel: formData.nivel || null,
                institucion: formData.institucion || null,
                area: formData.Area || null,
                subarea: formData.subArea || null,
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
    getSearchWithFilters,
};
