const { sequelize } = require("../model/connect/dataBase.js");
const { QueryTypes } = require("sequelize");

const getDetails = async (req, res) => {
try {
        const details = await sequelize.query(
            `
            `,
            {
                type: QueryTypes.SELECT,
                logging: false,
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error("Error al obtener detalles: ", error);
        res.status(500).json({ error: "Error al obtener detalles" });
    }

};