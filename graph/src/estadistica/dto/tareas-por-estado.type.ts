import { ObjectType, Field, Int} from "@nestjs/graphql";

@ObjectType()
export class TareasPorEstadoType {
    @Field(() => Int)
    pendiente: number;

    @Field(() => Int)
    en_progreso: number;

    @Field(() => Int)
    completada: number;
}