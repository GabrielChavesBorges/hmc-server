import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, Max, Min } from 'class-validator';
import { Location } from 'src/common/location.enum';

@InputType()
export class CreateGiftInput {
  @Field()
  @IsInt()
  receivingNpcId: number;

  @Field()
  @IsInt()
  itemGivenId: number;

  @Field()
  @IsBoolean()
  isNpcMarried: boolean;

  @Field(() => Location)
  @IsEnum(Location)
  location: Location;

  @Field()
  @IsInt()
  @Min(-8)
  @Max(8)
  affectionPoints: number;
}
