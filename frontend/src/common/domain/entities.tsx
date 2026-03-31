
export const ESTADOS_ORDEN = {
  PENDIENTE: "pendiente",
  PREPARACION: "preparacion",
  ENTREGADO: "entregado",
} as const;

export type EstadoOrden = typeof ESTADOS_ORDEN[keyof typeof ESTADOS_ORDEN];

export interface Orden {
  id: number;
  plato: string;
  cantidad: number;
  estado: EstadoOrden;
}

export interface Mesa {
  id: number;
  numero: number;
  mesero: string;
  disponible: boolean;
  cantidadPersonas: number;
  ordenes: Orden[];
}