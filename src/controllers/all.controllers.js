/*const {sequelize} = require("../model/connect/dataBase.js");
const {QueryTypes} = require("sequelize");

const getEspacio = async (req, res) => {
    try {
        const {keyword} = req.query; // Obtén la palabra clave desde los parámetros de la consulta

        const result = await sequelize.query(
            `SELECT ESPACIO_FORMATIVO
            FROM DH_GESTUDIANTE
            WHERE trim(AREA_1) = :keyword AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: {keyword},
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener ESPACIO_FORMATIVO: ", error);
        res.status(500).json({error: "Error al obtener ESPACIO_FORMATIVO"});
    }
};

const getArea = async (req, res) => {
    try {
        const result = await sequelize.query(
            `select distinct area VAL, AREA DIS from (
             select distinct AREA_1 area
               from DH_GESTUDIANTE
                UNION
                    select distinct AREA_2
                     from DH_GESTUDIANTE
                UNION
                    select distinct AREA_3
                      from DH_GESTUDIANTE
)
order by 1`,
            {
                type: QueryTypes.SELECT,
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener instituciones: ", error);
        res.status(500).json({error: "Error al obtener instituciones"});
    }
};

const searchController = async (req, res) => {
    const {palabraClave} = req.query;

    try {
        const result = await sequelize.query(`
            SELECT *
            FROM DH_GESTUDIANTE 
            WHERE LOWER(area_1) LIKE LOWER('%${palabraClave}%')
                OR LOWER(area_2) LIKE LOWER('%${palabraClave}%')
                OR LOWER(area_3) LIKE LOWER('%${palabraClave}%')
                OR LOWER(institucion) LIKE LOWER('%${palabraClave}%')
                OR LOWER(ESPACIO_FORMATIVO) LIKE LOWER('%${palabraClave}%')
                OR LOWER(GESTION) LIKE LOWER('%${palabraClave}%')
                OR LOWER(NIVEL) LIKE LOWER('%${palabraClave}%')
                OR LOWER(nombre) LIKE LOWER('%${palabraClave}%')
                OR LOWER(modalidad) LIKE LOWER('%${palabraClave}%')
                OR LOWER(duracion) LIKE LOWER('%${palabraClave}%')
                OR LOWER(subarea_1) LIKE LOWER('%${palabraClave}%')
                OR LOWER(subarea_2) LIKE LOWER('%${palabraClave}%')`,
            {
                type: QueryTypes.SELECT,
                logging: false,
            }
        );

        res.status(200).json({resultados: result});

    } catch (error) {
        console.error(error);

        res.status(500).send('Error en la búsqueda');
    }
};

const getDuracion = async (req, res) => {
    try {
        const {area} = req.query; // Obtén el valor del parámetro de área desde la consulta

        const result = await sequelize.query(
            `SELECT DURACION
                FROM DH_GESTUDIANTE
                WHERE trim (AREA_1) =  'ARTE' AND SUBAREA_1 IS NOT NULL;`, // Utiliza :area en lugar de P53_AREA_1
            {
                type: QueryTypes.SELECT,
                replacements: {area}, // Utiliza el valor del parámetro proporcionado en la consulta
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener ESPACIO_FORMATIVO: ", error);
        res.status(500).json({error: "Error al obtener ESPACIO_FORMATIVO"});
    }
};

const getHorarios = async (req, res) => {
    try {
        const {keyword} = req.query; // Obtén la palabra clave desde los parámetros de la consulta

        const result = await sequelize.query(
            `SELECT FRANJA_HORARIA
                FROM DH_GESTUDIANTE
                WHERE trim(AREA_1) = :keyword AND SUBAREA_1 IS NOT NULL;`,
            {
                type: QueryTypes.SELECT,
                replacements: {keyword},
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener FRANJA_HORARIA: ", error);
        res.status(500).json({error: "Error al obtener FRANJA_HORARIA"});
    }
};

const getGestion = async (req, res) => {
    try {
        const {area} = req.query; // Obtén el valor del parámetro de área desde la consulta

        const result = await sequelize.query(
            `SELECT GESTION
                FROM DH_GESTUDIANTE
                WHERE trim (AREA_1) =  'ARTE' AND SUBAREA_1 IS NOT NULL;`, // Utiliza :area en lugar de P53_AREA_1
            {
                type: QueryTypes.SELECT,
                replacements: {area}, // Utiliza el valor del parámetro proporcionado en la consulta
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener ESPACIO_FORMATIVO: ", error);
        res.status(500).json({error: "Error al obtener ESPACIO_FORMATIVO"});
    }
};

const getInstitutions = async (req, res) => {
    try {
        const result = await sequelize.query(
            `select distinct  institucion as display_value, institucion as return_value 
  from DH_GESTUDIANTE
 order by 1`,
            {
                type: QueryTypes.SELECT,
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener instituciones: ", error);
        res.status(500).json({error: "Error al obtener instituciones"});
    }
};

const getModalidad = async (req, res) => {
    try {
        const {area} = req.query; // Obtén el valor del parámetro de área desde la consulta

        const result = await sequelize.query(
            `SELECT MODALIDAD
                FROM DH_GESTUDIANTE
                WHERE trim (AREA_1) =  'ARTE' AND SUBAREA_1 IS NOT NULL;`, // Utiliza :area en lugar de P53_AREA_1
            {
                type: QueryTypes.SELECT,
                replacements: {area}, // Utiliza el valor del parámetro proporcionado en la consulta
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener ESPACIO_FORMATIVO: ", error);
        res.status(500).json({error: "Error al obtener ESPACIO_FORMATIVO"});
    }
};

const getSubA = async (req, res) => {
    try {
        // Obténgo el valor del área desde los parámetros de la solicitud
        const {area} = req.query;

        // Ejecuto la consulta SQL utilizando el valor del área
        const result = await sequelize.query(
            `SELECT DISTINCT SUBAREA AS VAL, SUBAREA AS DIS
            FROM (
                SELECT DISTINCT AREA_1 AS AREA, SUBAREA_1 AS SUBAREA
                FROM DH_GESTUDIANTE
                UNION
                SELECT DISTINCT AREA_2, SUBAREA_2
                FROM DH_GESTUDIANTE
                UNION
                SELECT DISTINCT AREA_3, SUBAREA_3
                FROM DH_GESTUDIANTE
            )
            WHERE AREA = :area`,
            {
                type: QueryTypes.SELECT,
                replacements: {area}, // Uso el valor del área obtenido de la solicitud
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener SUBAREA: ", error);
        res.status(500).json({error: "Error al SUBAREA"});
    }
};


module.exports = {
    getEspacio,
    getArea,
    searchController,
    getDuracion,
    getHorarios,
    getGestion,
    getInstitutions,
    getModalidad,
    getSubA,
};

 */