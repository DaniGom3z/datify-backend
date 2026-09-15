import prisma from "../config/prisma";
import bcrypt from 'bcryptjs';
import { CreateUserDTO, UpdateUserDTO, SafeUserResponse } from "../types/user";

export class UserService {
  /**
   * Obtiene todos los usuarios de forma segura
   */
  async getAll(): Promise<SafeUserResponse[]> {
    const users = await prisma.user.findMany({
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
  async getById(id: number): Promise<SafeUserResponse> {
    const user = await prisma.user.findUnique({
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
  async create(data: CreateUserDTO): Promise<SafeUserResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    const roleExists = await prisma.role.findUnique({
      where: { id: data.roleId },
    });

    if (!roleExists) {
      throw new Error("El rol proporcionado no es válido");
    }

    const passwordToHash = data.password || "DefaultPassword123*";
    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const newUser = await prisma.user.create({
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
  async update(id: number, data: UpdateUserDTO): Promise<SafeUserResponse> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const updateData: any = {};

    if (data.name) updateData.name = data.name;

    if (data.email && data.email !== user.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (emailTaken) {
        throw new Error("El correo electrónico ya está en uso por otro usuario");
      }
      updateData.email = data.email;
    }

    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    if (data.roleId) {
      const roleExists = await prisma.role.findUnique({ where: { id: data.roleId } });
      if (!roleExists) {
        throw new Error("El rol proporcionado no es válido");
      }
      updateData.roleId = data.roleId;
    }

    const updatedUser = await prisma.user.update({
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
  async delete(id: number): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    await prisma.user.delete({ where: { id } });
    return true;
  }
}