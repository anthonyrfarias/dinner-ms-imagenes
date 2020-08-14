import tokenService from "../services/token";

export default {
    verifyToken: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                error: 1,
                tag: "TOKEN_REQUIRED",
                message: "Token es obligatorio"
            });
        }

        const response = await tokenService.decode(req.headers.token);

        if (response) {
            next();
        } else {
            return res.status(404).send({
                error: 1,
                tag: "TOKEN_INVALID",
                message: "Token es invalido"
            });

        }
    }

}