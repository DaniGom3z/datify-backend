"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
class AuthService {
    /**
     * Validamos credenciales y regresamos token firmado
     */
    async login(email, password) {
        const user = await prisma_1.default.user.findUnique({
            where: { email },
            include: { role: true },
        });
        if (!user) {
            throw new Error("Credenciales inválidas");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error("Credenciales inválidas");
        }
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role.name,
        });
        return token;
    }
}
exports.AuthService = AuthService;
