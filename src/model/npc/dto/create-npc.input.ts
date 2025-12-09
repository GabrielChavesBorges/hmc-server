import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, Length } from 'class-validator';
import { Season } from 'src/common/season.enum';

@InputType()
export class CreateNpcInput {
  @Field()
  @IsString()
  @Length(1, 31)
  name: string;

  @Field(() => Season)
  @IsEnum(Season)
  birthSeason: Season;
}
