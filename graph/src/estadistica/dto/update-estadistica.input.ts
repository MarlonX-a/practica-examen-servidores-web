import { CreateEstadisticaInput } from './create-estadistica.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEstadisticaInput extends PartialType(CreateEstadisticaInput) {
  @Field(() => Int)
  id: number;
}
