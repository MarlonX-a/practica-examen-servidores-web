import { IsEnum, IsInt, IsString } from "class-validator";

export enum EstadoTarea {
    PENDIENTE = "pendiente",
    EN_PROGRESO = "en_progreso",
    COMPLETADA = "completada",
}


export class CreateTareaDto {


    @IsString()
    titulo: string;

    @IsEnum(EstadoTarea)
    estado: EstadoTarea;

    @IsInt()
    proyectoId: number;
}
