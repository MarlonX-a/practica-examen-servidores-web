import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IProyecto } from './Interfaces/proyecto.interface';
import { ITarea } from './Interfaces/tarea.interface';

@Injectable()
export class EstadisticaService {

  constructor(
    private readonly http: HttpService
  ) {}

  async getProyectos(): Promise<IProyecto[]> {
    const res = await firstValueFrom(this.http.get<IProyecto[]>('http://localhost:3000/proyectos'));
    return res.data;
  }

  async getTareas(): Promise<ITarea[]> {
    const res = await firstValueFrom(this.http.get<ITarea[]>('http://localhost:3000/tareas'));
    return res.data;
  }

  async tareasPorEstado() {
    const tareas = await this.getTareas();

    return {
      pendiente: tareas.filter(t => t.estado === 'pendiente').length,
      en_progreso: tareas.filter(t => t.estado === 'en_progreso').length,
      completada: tareas.filter(t => t.estado === 'completada').length,

    };
  }

  async progresoProyectos() {
      const proyectos = await this.getProyectos();
      const tareas = await this.getTareas();

      return proyectos.map(p => {
        const tp = tareas.filter(t => t.proyecto.id === p.id);
        const completadas = tp.filter(t => t.estado === 'completada').length;

        return {
          proyectoId: p.id,
          nombre: p.nombre,
          totalTareas: tp.length,
          completadas,
          progreso: tp.length ? completadas / tp.length : 0,
        };
      });
      
    }
}
