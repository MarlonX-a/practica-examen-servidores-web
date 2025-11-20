import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Repository } from 'typeorm';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepo: Repository<Tarea>,

    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>
  ) {}

  async create(createTareaDto: CreateTareaDto) {
    const proyecto = await this.proyectoRepo.findOneBy({
      id: createTareaDto.proyectoId
    })

    if (!proyecto) {
      throw new NotFoundException(
        `No existe el proyecto con id: ${createTareaDto.proyectoId}`
      );
    }

    const tarea = this.tareaRepo.create({
      ...createTareaDto,
      proyecto
    })
    return this.tareaRepo.save(tarea);
  }

  async findAll() {
    const tareas = await this.tareaRepo.find({
      relations: ['proyecto']
    });

    if (tareas.length === 0) {
      throw new NotFoundException('No existen tareas registradas');
    }
    return tareas;
  }

  async findOne(id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número valido mayor a 0');
    }

    const tarea = await this.tareaRepo.findOne({
      where: {id},
      relations: ['proyecto']
    })

    if (!tarea){
      throw new NotFoundException(`No se encontro la tarea con el id: ${id}`);
    }
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
   if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número valido mayor a 0');
    }

    const tarea = await this.tareaRepo.findOne({
      where: {id},
      relations: ['proyecto']
    })

    if (!tarea){
      throw new NotFoundException(`No se encontro la tarea con el id: ${id}`);
    }
    
    if (updateTareaDto.proyectoId !== undefined) {
      const proyecto = await this.proyectoRepo.findOneBy({id: updateTareaDto.proyectoId});

      if (!proyecto) {
        throw new NotFoundException(`Proyecto con id ${updateTareaDto.proyectoId} no existe.`);
      }

      tarea.proyecto = proyecto;
    }

    Object.assign(tarea, updateTareaDto);

    return this.tareaRepo.save(tarea);
  }

  async remove(id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número valido mayor a 0');
    }

    const tarea = await this.tareaRepo.findOneBy({id});

    if (!tarea){
      throw new NotFoundException(`No se encontro la tarea con el id: ${id}`);
    }

    await this.tareaRepo.remove(tarea);
    return {message: 'Tarea eliminada correctamente'};
  }
}
