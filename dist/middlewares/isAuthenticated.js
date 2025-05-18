"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        // validar o token.
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // recuperar o id do token e colocar dentro de uma variável user_id dentro do Request
        req.user_id = sub;
        next();
    }
    catch (err) {
        res.status(401).end();
    }
    ;
}
