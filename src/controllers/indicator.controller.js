"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorController = void 0;
const indicator_service_1 = require("../services/indicator.service");
const indicatorService = new indicator_service_1.IndicatorService();
class IndicatorController {
    async getAll(req, res) {
        try {
            const indicators = await indicatorService.getAll();
            res.status(200).json(indicators);
        }
        catch (error) {
            res.status(500).json({ error: "Error al obtener los indicadores" });
        }
    }
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "ID de indicador no válido" });
                return;
            }
            const indicator = await indicatorService.getById(id);
            res.status(200).json(indicator);
        }
        catch (error) {
            if (error.message === "Indicador no encontrado") {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error al obtener el indicador" });
            }
        }
    }
    async create(req, res) {
        try {
            const { name, description, valorActual, meta, unidadMedida, areaId } = req.body;
            if (!name || valorActual === undefined || meta === undefined || !unidadMedida || !areaId) {
                res.status(400).json({ error: "Faltan campos requeridos en la petición." });
                return;
            }
            if (!req.user || !req.user.id) {
                res.status(401).json({ error: "Acceso denegado: Usuario no autenticado" });
                return;
            }
            const creadoPor = req.user.id;
            const indicator = await indicatorService.create({
                name,
                description,
                valorActual: Number(valorActual),
                meta: Number(meta),
                unidadMedida,
                areaId: Number(areaId),
                creadoPor,
            });
            res.status(201).json({
                message: "Indicator created successfully",
                indicator,
            });
        }
        catch (error) {
            if (error.message === "El área especificada no existe") {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error interno al registrar el indicador" });
            }
        }
    }
    async update(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, description, valorActual, meta, unidadMedida, areaId } = req.body;
            if (isNaN(id)) {
                res.status(400).json({ error: "ID de indicador no válido" });
                return;
            }
            const updated = await indicatorService.update(id, {
                name,
                description,
                valorActual: valorActual !== undefined ? Number(valorActual) : undefined,
                meta: meta !== undefined ? Number(meta) : undefined,
                unidadMedida,
                areaId: areaId !== undefined ? Number(areaId) : undefined,
            });
            res.status(200).json({
                message: "Indicator updated successfully",
                indicator: updated,
            });
        }
        catch (error) {
            if (error.message === "Indicador no encontrado") {
                res.status(404).json({ error: error.message });
            }
            else if (error.message === "El área especificada no existe") {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error al actualizar el indicador" });
            }
        }
    }
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "ID de indicador no válido" });
                return;
            }
            await indicatorService.delete(id);
            res.status(200).json({ message: "Indicator deleted successfully" });
        }
        catch (error) {
            if (error.message === "Indicador no encontrado") {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error al eliminar el indicador" });
            }
        }
    }
}
exports.IndicatorController = IndicatorController;
