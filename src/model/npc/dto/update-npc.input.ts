import { IsString, Length } from 'class-validator';
import { CreateNpcInput } from './create-npc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNpcInput extends PartialType(CreateNpcInput) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsString()
  @Length(1, 31)
  name: string;
}
