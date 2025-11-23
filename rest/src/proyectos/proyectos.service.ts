import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';
import axios from 'axios'

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    const existing = await this.proyectoRepo.findOne({
      where: {nombre: createProyectoDto.nombre}
    })


    if (existing){
      throw new ConflictException(
        `Ya existe un proyecto con el nombre: ${createProyectoDto.nombre}`,
      );
    }

    const proyecto = this.proyectoRepo.create(createProyectoDto);
    const creado = await this.proyectoRepo.save(proyecto);
    await axios.post('http://localhost:3002/eventos/notificar', {
      origen: 'proyecto',
      accion: 'creado',
      data: creado,
    })
    return creado;
  }

  async findAll() {
    const proyectos = await this.proyectoRepo.find({
      relations: ['tareas'],
    });

    if (proyectos.length === 0) {
      throw new NotFoundException('No se encontraron proyectos.');
    }

    return proyectos;
  }

  async findOne(id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número válido mayor a 0.');
    }

    const proyecto = await this.proyectoRepo.findOne({
      where: {id},
      relations: ['tareas'],
    })

    if (!proyecto) {
      throw new NotFoundException(`No se encontro el proyecto con id: ${id}`);
    }

    return proyecto;
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número válido mayor a 0.');
    }

    const proyecto = await this.proyectoRepo.findOne({
      where: {id}
    });

    if (!proyecto) {
      throw new NotFoundException(`No se encontraron proyectos con id: ${id}`);
    }

    if (updateProyectoDto.nombre) {
      const existing = await this.proyectoRepo.findOne({
        where: { nombre: updateProyectoDto.nombre },
      })

      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Ya existe otro proyecto con el nombre: ${updateProyectoDto.nombre}`
        );
      }
    }

    const update = await this.proyectoRepo.preload({
      id,
      ...updateProyectoDto
    });

    if (!update) {
      throw new NotFoundException(`No se pudo actualizar el proyecto con id: ${id}`);
    }
    return this.proyectoRepo.save(update);
  }

  async remove(id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número válido mayor a 0.');
    }

    const proyecto = await this.proyectoRepo.findOne({
      where: {id}
    });

    if (!proyecto) {
      throw new NotFoundException(`No se encontraron proyectos con id: ${id}`);
    }

    await this.proyectoRepo.remove(proyecto);

    await axios.post('http://localhost:3002/eventos/notificar', {
      origen: 'proyecto',
      action: 'eliminado',
      data: proyecto,
    });

    return { message: 'Proyecto eliminado correctamente'};
  }
}
