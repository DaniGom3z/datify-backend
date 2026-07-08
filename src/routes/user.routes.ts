import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();


router.use(authenticateToken);
router.use(authorizeRoles("ADMIN"));

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (Solo ADMIN)
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: Acceso denegado (No es ADMIN).
 */
router.get("/", (req, res) => userController.getAll(req, res));

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID (Solo ADMIN)
 *     tags: [Usuarios]
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
 *         description: Datos del usuario.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get("/:id", (req, res) => userController.getById(req, res));

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario (Solo ADMIN)
 *     tags: [Usuarios]
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
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@mail.com
 *               password:
 *                 type: string
 *                 example: passwordSecure123*
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 */
router.post("/", (req, res) => userController.create(req, res));

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar información de un usuario (Solo ADMIN)
 *     tags: [Usuarios]
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
 *                 example: Juan Pérez Actualizado
 *               email:
 *                 type: string
 *                 example: juan_actualizado@mail.com
 *               password:
 *                 type: string
 *                 example: newPassword890*
 *               rolId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 */
router.put("/:id", (req, res) => userController.update(req, res));

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario (Solo ADMIN)
 *     tags: [Usuarios]
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
 *         description: Usuario eliminado con éxito.
 */
router.delete("/:id", (req, res) => userController.delete(req, res));

export default router;