import prisma from "../config/prisma";
import { CreateIndicatorDTO, UpdateIndicatorDTO } from "../types/indicator";

export class IndicatorService {
  /**
   * Obtiene todos los indicadores con los detalles de Área y Creador
   */
  async getAll() {
    return prisma.indicator.findMany({
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
  async getById(id: number) {
    const indicator = await prisma.indicator.findUnique({
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
  async create(data: CreateIndicatorDTO) {
     const areaExists = await prisma.area.findUnique({
      where: { id: data.areaId },
    });

    if (!areaExists) {
      throw new Error("El área especificada no existe");
    }

    return prisma.indicator.create({
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
  async update(id: number, data: UpdateIndicatorDTO) {
    const indicator = await prisma.indicator.findUnique({ where: { id } });
    if (!indicator) {
      throw new Error("Indicador no encontrado");
    }

    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.valorActual !== undefined) updateData.valorActual = data.valorActual;
    if (data.meta !== undefined) updateData.meta = data.meta;
    if (data.unidadMedida) updateData.unidadMedida = data.unidadMedida;

    if (data.areaId) {
      const areaExists = await prisma.area.findUnique({ where: { id: data.areaId } });
      if (!areaExists) {
        throw new Error("El área especificada no existe");
      }
      updateData.areaId = data.areaId;
    }

    return prisma.indicator.update({
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
  async delete(id: number) {
    const indicator = await prisma.indicator.findUnique({ where: { id } });
    if (!indicator) {
      throw new Error("Indicador no encontrado");
    }

    await prisma.indicator.delete({ where: { id } });
    return true;
  }
}