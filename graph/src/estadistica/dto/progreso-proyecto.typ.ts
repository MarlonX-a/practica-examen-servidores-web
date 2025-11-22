import { ObjectType, Field, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class ProgresoProyectoType {
    @Field(() => Int)
    proyectoId: number;

    @Field()
    nombre: string;

    @Field(() => Int)
    totalTareas: number;

    @Field(() => Int)
    completadas: number;

    @Field(() => Float)
    progreso: number;
}