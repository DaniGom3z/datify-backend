"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    /**
     * Endpoint POST /api/auth/login
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "El correo y la contraseña son requeridos." });
                return;
            }
            const token = await authService.login(email, password);
            res.status(200).json({ token });
        }
        catch (error) {
            if (error.message === "Credenciales inválidas") {
                res.status(401).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error interno del servidor" });
            }
        }
    }
}
exports.AuthController = AuthController;
