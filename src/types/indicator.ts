export interface CreateIndicatorDTO {
  name: string;
  description?: string;
  valorActual: number;
  meta: number;
  unidadMedida: string;
  areaId: number;
  creadoPor: number;
}

export interface UpdateIndicatorDTO {
  name?: string;
  description?: string;
  valorActual?: number;
  meta?: number;
  unidadMedida?: string;
  areaId?: number;
}