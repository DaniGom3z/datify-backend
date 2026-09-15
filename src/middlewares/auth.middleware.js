"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.authorizeRoles = authorizeRoles;
const jwt_1 = require("../utils/jwt");
/**
 * Middleware para validar la autenticidad del token
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Token de acceso no proporcionado." });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ error: "Token inválido o expirado." });
    }
}
/**
 * Middleware para restringir accesos según el rol de usuario
 */
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: "Usuario no autenticado." });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ error: "Acceso denegado: permisos insuficientes." });
            return;
        }
        next();
    };
}
