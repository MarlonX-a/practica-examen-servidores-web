import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    estado: 'pendiente' |'en_progreso' | 'completada';

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas,{ onDelete: 'CASCADE'})
    proyecto: Proyecto;
}
