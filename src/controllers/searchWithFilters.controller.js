const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getSearchWithFilters = async (req, res) => {
    try {
        const formData = req.query;  // Utiliza formData directamente del cuerpo del formulario

        const result = await sequelize.query(`
            SELECT DISTINCT 
                institucion, 
                area_1, 
                subarea_1, 
                espacio_formativo, 
                gestion, 
                modalidad, 
                franja_horaria, 
                duracion
            FROM DH_GESTUDIANTE
            WHERE 
                LOWER(institucion) LIKE LOWER('%' || :institucion || '%')
                AND LOWER(area_1) LIKE LOWER('%' || :area || '%')
                AND (
                    LOWER(subarea_1) LIKE LOWER('%' || :subarea || '%') 
                    OR LOWER(subarea_2) LIKE LOWER('%' || :subarea || '%')
                )
                AND LOWER(espacio_formativo) LIKE LOWER('%' || :espacioFormativo || '%')
                AND LOWER(gestion) LIKE LOWER('%' || :gestion || '%')
                AND LOWER(modalidad) LIKE LOWER('%' || :modalidad || '%')
                AND LOWER(franja_horaria) LIKE LOWER('%' || :franjaHoraria || '%')
                AND LOWER(duracion) LIKE LOWER('%' || :duracion || '%')
            ORDER BY 1
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
                duracion: formData.duracion || null
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
