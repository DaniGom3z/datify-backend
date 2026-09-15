"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class IndicatorService {
    /**
     * Obtiene todos los indicadores con los detalles de Área y Creador
     */
    async getAll() {
        return prisma_1.default.indicator.findMany({
            include: {
                area: {
                    select: { id: true, name: true },
                },
                creator: {
                    select: { id: true, name: true },
                },
            },
        });
    }
    /**
     * Obtiene un único indicador por ID con sus relaciones
     */
    async getById(id) {
        const indicator = await prisma_1.default.indicator.findUnique({
            where: { id },
            include: {
                area: {
                    select: { id: true, name: true },
                },
                creator: {
                    select: { id: true, name: true },
                },
            },
        });
        if (!indicator) {
            throw new Error("Indicador no encontrado");
        }
        return indicator;
    }
    /**
     * Registra un nuevo indicador validando la existencia del área y creador
     */
    async create(data) {
        const areaExists = await prisma_1.default.area.findUnique({
            where: { id: data.areaId },
        });
        if (!areaExists) {
            throw new Error("El área especificada no existe");
        }
        return prisma_1.default.indicator.create({
            data: {
                name: data.name,
                description: data.description,
                valorActual: data.valorActual,
                meta: data.meta,
                unidadMedida: data.unidadMedida,
                areaId: data.areaId,
                creadoPor: data.creadoPor,
            },
            include: {
                area: { select: { id: true, name: true } },
                creator: { select: { id: true, name: true } },
            },
        });
    }
    /**
     * Actualiza los datos de un indicador
     */
    async update(id, data) {
        const indicator = await prisma_1.default.indicator.findUnique({ where: { id } });
        if (!indicator) {
            throw new Error("Indicador no encontrado");
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.valorActual !== undefined)
            updateData.valorActual = data.valorActual;
        if (data.meta !== undefined)
            updateData.meta = data.meta;
        if (data.unidadMedida)
            updateData.unidadMedida = data.unidadMedida;
        if (data.areaId) {
            const areaExists = await prisma_1.default.area.findUnique({ where: { id: data.areaId } });
            if (!areaExists) {
                throw new Error("El área especificada no existe");
            }
            updateData.areaId = data.areaId;
        }
        return prisma_1.default.indicator.update({
            where: { id },
            data: updateData,
            include: {
                area: { select: { id: true, name: true } },
                creator: { select: { id: true, name: true } },
            },
        });
    }
    /**
     * Elimina un indicador por ID
     */
    async delete(id) {
        const indicator = await prisma_1.default.indicator.findUnique({ where: { id } });
        if (!indicator) {
            throw new Error("Indicador no encontrado");
        }
        await prisma_1.default.indicator.delete({ where: { id } });
        return true;
    }
}
exports.IndicatorService = IndicatorService;
