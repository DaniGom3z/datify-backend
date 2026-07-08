import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Middleware para validar la autenticidad del token
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token de acceso no proporcionado." });
    return;
  }

  try {
    const decoded = verifyToken(token);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado." });
  }
}

/**
 * Middleware para restringir accesos según el rol de usuario
 */
export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Usuario no autenticado." });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Acceso denegado: permisos insuficientes." });
      return;
    }

    next();
  };
}