import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  /**
   * Endpoint POST /api/auth/login
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "El correo y la contraseña son requeridos." });
        return;
      }

      const token = await authService.login(email, password);

      res.status(200).json({ token });
    } catch (error: any) {
      if (error.message === "Credenciales inválidas") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
}