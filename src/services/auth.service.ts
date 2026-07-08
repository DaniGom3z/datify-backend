import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export class AuthService {
  /**
   * Validamos credenciales y regresamos token firmado
   */
  async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    return token;
  }
}