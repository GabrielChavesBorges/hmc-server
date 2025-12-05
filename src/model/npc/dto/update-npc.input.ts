import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateNpcInput } from './create-npc.input';

@InputType()
export class UpdateNpcInput extends PartialType(CreateNpcInput) {
  @Field(() => Int)
  id: number;
}
