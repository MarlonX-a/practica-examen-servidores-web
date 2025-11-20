import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Proyecto])],
  controllers: [TareasController],
  providers: [TareasService],
  exports: [TareasService]
})
export class TareasModule {}
