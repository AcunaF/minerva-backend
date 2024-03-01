const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getDetails = async (req, res) => {
    try {
        console.log("Recibida solicitud:", req.url, req.query);
        const formDataDetail = req.query;

        const result = await sequelize.query(`
            SELECT  
                TITULO,
                ESPACIO_FORMATIVO,
                AREA_1,
                INSTITUCION,
                GESTION,
                MODALIDAD,              
                DURACION,
                FRANJA_HORARIA,
                NIVEL,
                MAIL,
                WEB,
                REDES,
                CALLE,
                PUERTA,
                CONTACTO
                
            FROM DH_GESTUDIANTE
            
            WHERE   
                (:institucion IS NULL OR LOWER(INSTITUCION) LIKE LOWER('%' || :institucion || '%'))
                AND (:area IS NULL OR LOWER(AREA_1) LIKE LOWER('%' || :area || '%'))
                AND (:espacioFormativo IS NULL OR LOWER(ESPACIO_FORMATIVO) LIKE LOWER('%' || :espacioFormativo || '%'))
                AND (:gestion IS NULL OR LOWER(GESTION) LIKE LOWER('%' || :gestion || '%'))
                AND (:modalidad IS NULL OR LOWER(MODALIDAD) LIKE LOWER('%' || :modalidad || '%'))
                AND (:franjaHoraria IS NULL OR LOWER(FRANJA_HORARIA) LIKE LOWER('%' || :franjaHoraria || '%'))
                AND (:nombre IS NULL OR LOWER(NOMBRE) LIKE LOWER('%' || :nombre || '%'))
        `, {
            type: QueryTypes.SELECT,
            replacements: {
                institucion: formDataDetail.institucion,
                nombre: formDataDetail.nombre,
                area: formDataDetail.area,
                subarea: formDataDetail.subarea,
                espacioFormativo: formDataDetail.espacioFormativo,
                gestion: formDataDetail.gestion,
                modalidad: formDataDetail.modalidad,
                franjaHoraria: formDataDetail.franjaHoraria,

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
