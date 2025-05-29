export type Ubication = {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  descripcion?: string; // Opcional
};

export type UbicationCreate = {
  latitud: number;
  longitud: number;
};