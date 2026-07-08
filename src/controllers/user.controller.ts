import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "El ID proporcionado no es un número válido" });
        return;
      }

      const user = await userService.getById(id);
      res.status(200).json(user);
    } catch (error: any) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error al obtener el usuario" });
      }
    }
  }

  async create(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      if (
        error.message === "El correo electrónico ya está registrado" ||
        error.message === "El rol proporcionado no es válido"
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno al crear el usuario" });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
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
    } catch (error: any) {
      const statusMap: Record<string, number> = {
        "Usuario no encontrado": 404,
        "El correo electrónico ya está en uso por otro usuario": 400,
        "El rol proporcionado no es válido": 400,
      };

      const status = statusMap[error.message] || 500;
      res.status(status).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "El ID proporcionado no es válido" });
        return;
      }

      await userService.delete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error al eliminar el usuario" });
      }
    }
  }
}