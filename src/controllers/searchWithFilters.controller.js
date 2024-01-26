const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getSearchWithFilters = async (req, res) => {
    try {
        let institucion = req.query.institucion;
        let area = req.query.area;
        let subarea = req.query.subarea;
        let espacioFormativo = req.query.espacioFormativo;
        let gestion = req.query.gestion;
        let modalidad = req.query.modalidad;
        let franja_horaria = req.query.franja_horaria;
        let duracion = req.query.duracion;

        const result = await sequelize.query(
            `SELECT DISTINCT 
                institucion, 
                area_1, 
                subarea_1, 
                espacio_formativo, 
                gestion, 
                modalidad, 
                franja_horaria, 
                duracion
             FROM DH_GESTUDIANTE
             WHERE LOWER(institucion) LIKE LOWER('%' || :institucion || '%')
             AND (LOWER(area_1) LIKE LOWER('%' || :area || '%'))  
             AND (
                 LOWER(subarea_1) LIKE LOWER('%' || :subarea || '%') 
                 OR LOWER(subarea_2) LIKE LOWER('%' || :subarea || '%')
             )
             AND (LOWER(espacio_formativo) LIKE LOWER('%' || :espacioFormativo || '%'))
             AND (LOWER(gestion) LIKE LOWER('%' || :gestion || '%'))
             AND (LOWER(modalidad) LIKE LOWER('%' || :modalidad || '%'))
             AND (LOWER(franja_horaria) LIKE LOWER('%' || :franja_horaria || '%'))
             AND (LOWER(duracion) LIKE LOWER('%' || :duracion || '%'))
             ORDER BY 1`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    institucion: institucion || null,
                    area: area || null,
                    subarea: subarea || null,
                    espacioFormativo: espacioFormativo || null,
                    gestion: gestion || null,
                    modalidad: modalidad || null,
                    franja_horaria: franja_horaria || null,
                    duracion: duracion || null
                },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener filtros: ", error);
        res.status(500).json({ error: "Error al obtener filtros" });
    }
};

module.exports = {
    getSearchWithFilters,
};
