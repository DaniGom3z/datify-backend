import { Role } from "@prisma/client"

export interface JWTPayload {
    id:number
    email:string
    role:string
}

declare global{
    namespace Express {
        interface Request {
            user?: JWTPayload
        }
    }
}