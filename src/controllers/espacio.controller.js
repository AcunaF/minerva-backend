const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getEspacio = async (req, res) => {
    try {
        const  area  = req.query.area
        const  subarea  = req.query.subarea // Obtén los valores de área y subárea desde los parámetros de la consulta

        const result = await sequelize.query(
            ` 
          SELECT ESPACIO_FORMATIVO 
        FROM DH_GESTUDIANTE
        WHERE NLSSORT(UPPER(AREA_1), 'NLS_SORT=BINARY_AI') LIKE '%' || NLSSORT(UPPER(:area), 'NLS_SORT=BINARY_AI') || '%'
        AND NLSSORT(UPPER(SUBAREA_1), 'NLS_SORT=BINARY_AI') LIKE '%' || NLSSORT(UPPER(:subarea), 'NLS_SORT=BINARY_AI') || '%'
                
                `,

            {
                type: QueryTypes.SELECT,
                replacements: {
                    area: area || null,
                    subarea: subarea || null,
                },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener ESPACIO_FORMATIVO: ", error);
        res.status(500).json({ error: "Error al obtener ESPACIO_FORMATIVO" });
    }
};

module.exports = {
    getEspacio,
};
