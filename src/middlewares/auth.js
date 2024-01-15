const base64 = require("base-64");

const auth = (req, res, next) => {
    try {
        // Obtiene el valor del header 'Authorization'
        const token = req.headers.authorization;

        // Verifica si existe el token
        if (!token) {
            return res.status(401).send("No se ha proporcionado un token");
        }

        // Verifica si el token es válido
        if (!token.startsWith("Basic ")) {
            return res.status(401).send("Formato de token inválido");
        }

        const tokenWithoutBearer = token.split(" ")[1];
        const tok = "restapi:restapi";
        const hash = base64.encode(tok);
        if (hash === tokenWithoutBearer) {
            return next();
        }
        return res.status(401).send("Token inválido");
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

module.exports = auth