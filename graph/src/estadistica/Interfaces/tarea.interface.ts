import { IProyecto } from "./proyecto.interface";

export interface ITarea {
  id: number;
  titulo: string;
  estado: 'pendiente' | 'en_progreso' | 'completada';
  proyecto: IProyecto;
}