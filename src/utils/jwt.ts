import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/express";

const JWT_SECRET= process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("La variable de entorno JWT_SECRET no está definida.");
}

/**
 * Generamos el token firmado
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "24h" });
}

/**
 * Verifica un token JWT y devuelve su payload decodificado
 */
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET as string) as JWTPayload;
}