"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
class UserController {
    async getAll(req, res) {
        try {
            const users = await userService.getAll();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    }
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "El ID proporcionado no es un número válido" });
                return;
            }
            const user = await userService.getById(id);
            res.status(200).json(user);
        }
        catch (error) {
            if (error.message === "Usuario no encontrado") {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error al obtener el usuario" });
            }
        }
    }
    async create(req, res) {
        try {
            const { name, email, password, roleId } = req.body;
            if (!name || !email || !password || !roleId) {
                res.status(400).json({ error: "Todos los campos son obligatorios (name, email, password, rolId)." });
                return;
            }
            if (password.length < 8) {
                res.status(400).json({ error: "La contraseña debe tener mínimo 8 caracteres." });
                return;
            }
            const user = await userService.create({ name, email, password, roleId });
            res.status(201).json({
                message: "User created successfully",
                user,
            });
        }
        catch (error) {
            if (error.message === "El correo electrónico ya está registrado" ||
                error.message === "El rol proporcionado no es válido") {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error interno al crear el usuario" });
            }
        }
    }
    async update(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, email, password, roleId } = req.body;
            if (isNaN(id)) {
                res.status(400).json({ error: "El ID proporcionado no es válido" });
                return;
            }
            if (password && password.length < 8) {
                res.status(400).json({ error: "La nueva contraseña debe tener mínimo 8 caracteres." });
                return;
            }
            const updatedUser = await userService.update(id, { name, email, password, roleId });
            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            const statusMap = {
                "Usuario no encontrado": 404,
                "El correo electrónico ya está en uso por otro usuario": 400,
                "El rol proporcionado no es válido": 400,
            };
            const status = statusMap[error.message] || 500;
            res.status(status).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "El ID proporcionado no es válido" });
                return;
            }
            await userService.delete(id);
            res.status(200).json({ message: "User deleted successfully" });
        }
        catch (error) {
            if (error.message === "Usuario no encontrado") {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error al eliminar el usuario" });
            }
        }
    }
}
exports.UserController = UserController;
