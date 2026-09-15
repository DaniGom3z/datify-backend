"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indicator_controller_1 = require("../controllers/indicator.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const indicatorController = new indicator_controller_1.IndicatorController();
router.use(auth_middleware_1.authenticateToken);
/**
 * @openapi
 * /api/indicators:
 *   get:
 *     summary: Obtener todos los indicadores (ADMIN y USER)
 *     tags: [Indicadores]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de indicadores.
 */
router.get("/", (req, res) => indicatorController.getAll(req, res));
/**
 * @openapi
 * /api/indicators/{id}:
 *   get:
 *     summary: Obtener un indicador por ID (ADMIN y USER)
 *     tags: [Indicadores]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos completos del indicador.
 *       404:
 *         description: Indicador no encontrado.
 */
router.get("/:id", (req, res) => indicatorController.getById(req, res));
// --- OPERACIONES EXCLUSIVAS PARA ADMINISTRADORES ("ADMIN") ---
/**
 * @openapi
 * /api/indicators:
 *   post:
 *     summary: Crear un nuevo indicador (Solo ADMIN)
 *     tags: [Indicadores]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - valorActual
 *               - meta
 *               - unidadMedida
 *               - areaId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margen Operativo Q3
 *               description:
 *                 type: string
 *                 example: Porcentaje de utilidad operativa del tercer trimestre.
 *               valorActual:
 *                 type: number
 *                 example: 74.5
 *               meta:
 *                 type: number
 *                 example: 80.0
 *               unidadMedida:
 *                 type: string
 *                 example: "%"
 *               areaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Indicador registrado de forma exitosa.
 */
router.post("/", (0, auth_middleware_1.authorizeRoles)("ADMIN"), (req, res) => indicatorController.create(req, res));
/**
 * @openapi
 * /api/indicators/{id}:
 *   put:
 *     summary: Actualizar un indicador por ID (Solo ADMIN)
 *     tags: [Indicadores]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               valorActual:
 *                 type: number
 *               meta:
 *                 type: number
 *               unidadMedida:
 *                 type: string
 *               areaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Indicador actualizado con éxito.
 */
router.put("/:id", (0, auth_middleware_1.authorizeRoles)("ADMIN"), (req, res) => indicatorController.update(req, res));
/**
 * @openapi
 * /api/indicators/{id}:
 *   delete:
 *     summary: Eliminar un indicador por ID (Solo ADMIN)
 *     tags: [Indicadores]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Indicador eliminado exitosamente.
 */
router.delete("/:id", (0, auth_middleware_1.authorizeRoles)("ADMIN"), (req, res) => indicatorController.delete(req, res));
exports.default = router;
