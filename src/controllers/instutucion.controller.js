const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");


//ok
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
        res.status(500).json({ error: "Error al obtener instituciones" });
    }
};


module.exports = {
    getInstitutions,
};
