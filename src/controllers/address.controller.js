const { sequelize } = require("../model/connect/dataBase");
const { QueryTypes } = require("sequelize");

const getAddress = async (req, res) => {
    try {
        const result = await sequelize.query(
            `
            SELECT DISTINCT
                CALLE,
                PUERTA,
                LOCALIDAD
            FROM DH_GESTUDIANTE
            WHERE LOWER(NVL(TRIM(institucion), '')) LIKE LOWER('%' || TRIM(:institucion) || '%')
            ORDER BY 1;
            `,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    institucion: req.query.institucion || '',
                },
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener la dirección: ", error);
        res.status(500).json({ error: "Error al obtener la dirección" });
    }
};

module.exports = {
    getAddress,
};
