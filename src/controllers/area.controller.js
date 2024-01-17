const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");


//ok
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
        res.status(500).json({ error: "Error al obtener instituciones" });
    }
};


module.exports = {
    getArea,
};




