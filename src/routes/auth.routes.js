"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión en la plataforma
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@datify.com
 *               password:
 *                 type: string
 *                 example: Admin123*
 *     responses:
 *       200:
 *         description: Login exitoso, retorna el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Petición incorrecta (faltan parámetros).
 *       401:
 *         description: Credenciales inválidas.
 */
router.post("/login", (req, res, next) => authController.login(req, res, next));
/**
 * @openapi
 * /api/auth/protected:
 *   get:
 *     summary: Ruta de prueba para verificar JWT
 *     tags: [Autenticación]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso concedido, retorna datos del token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Acceso concedido a zona protegida.
 *                 user:
 *                   type: object
 *       401:
 *         description: Token de acceso no proporcionado.
 *       403:
 *         description: Token inválido o expirado.
 */
router.get("/protected", auth_middleware_1.authenticateToken, (req, res) => {
    res.status(200).json({
        message: "Acceso concedido a zona protegida.",
        user: req.user,
    });
});
exports.default = router;
