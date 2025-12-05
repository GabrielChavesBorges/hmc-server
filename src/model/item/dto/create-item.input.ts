import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field()
  @IsString()
  @Length(1, 31)
  name: string;

  @Field()
  @IsBoolean()
  is_edible: boolean;
}
