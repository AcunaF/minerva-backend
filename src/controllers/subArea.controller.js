const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");



const subArea = async (req, res) => {
    try {
        const result = await sequelize.query(
            `select distinct SUBAREA VAL, SUBAREA DIS from (
select distinct AREA_1 AREA, SUBAREA_1 SUBarea
  from DH_GESTUDIANTE
UNION
select distinct AREA_2, SUBAREA_2
  from DH_GESTUDIANTE
UNION
select distinct AREA_3, SUBAREA_3
  from DH_GESTUDIANTE
)
WHERE AREA=:P53_AREA_1`,
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
    subArea,
};




