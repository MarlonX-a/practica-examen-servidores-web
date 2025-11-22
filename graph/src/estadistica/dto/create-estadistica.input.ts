import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEstadisticaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
