"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    /**
     * Obtiene todos los usuarios de forma segura
     */
    async getAll() {
        const users = await prisma_1.default.user.findMany({
            include: { role: true },
        });
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
            createdAt: user.createdAt,
        }));
    }
    /**
     * Obtiene un usuario por ID de forma segura
     */
    async getById(id) {
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            include: { role: true },
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
            createdAt: user.createdAt,
        };
    }
    /**
     * Registra un nuevo usuario encriptando su contraseña
     */
    async create(data) {
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error("El correo electrónico ya está registrado");
        }
        const roleExists = await prisma_1.default.role.findUnique({
            where: { id: data.roleId },
        });
        if (!roleExists) {
            throw new Error("El rol proporcionado no es válido");
        }
        const passwordToHash = data.password || "DefaultPassword123*";
        const hashedPassword = await bcryptjs_1.default.hash(passwordToHash, 10);
        const newUser = await prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: hashedPassword,
                roleId: data.roleId,
            },
            include: { role: true },
        });
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role.name,
        };
    }
    /**
     * Actualiza la información de un usuario
     */
    async update(id, data) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.email && data.email !== user.email) {
            const emailTaken = await prisma_1.default.user.findUnique({
                where: { email: data.email },
            });
            if (emailTaken) {
                throw new Error("El correo electrónico ya está en uso por otro usuario");
            }
            updateData.email = data.email;
        }
        if (data.password) {
            updateData.passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        }
        if (data.roleId) {
            const roleExists = await prisma_1.default.role.findUnique({ where: { id: data.roleId } });
            if (!roleExists) {
                throw new Error("El rol proporcionado no es válido");
            }
            updateData.roleId = data.roleId;
        }
        const updatedUser = await prisma_1.default.user.update({
            where: { id },
            data: updateData,
            include: { role: true },
        });
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role.name,
        };
    }
    /**
     * Elimina un usuario del sistema
     */
    async delete(id) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        await prisma_1.default.user.delete({ where: { id } });
        return true;
    }
}
exports.UserService = UserService;
