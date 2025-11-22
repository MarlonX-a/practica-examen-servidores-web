import { Resolver, Query } from '@nestjs/graphql';
import { EstadisticaService } from './estadistica.service';
import { TareasPorEstadoType } from './dto/tareas-por-estado.type';
import { ProgresoProyectoType } from './dto/progreso-proyecto.typ';

@Resolver()
export class EstadisticaResolver {
  constructor(
    private readonly service: EstadisticaService
  ) {}

  @Query(() => TareasPorEstadoType)
  tareasPorEstado() {
    return this.service.tareasPorEstado();
  }

  @Query(() => [ProgresoProyectoType])
  progresoProyectos() {
    return this.service.progresoProyectos();
  }
}
