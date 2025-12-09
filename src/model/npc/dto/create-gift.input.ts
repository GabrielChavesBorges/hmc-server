import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, Max, Min } from 'class-validator';
import { Location } from 'src/common/location.enum';

@InputType()
export class CreateGiftInput {
  @Field()
  @IsInt()
  receiving_npc_id: number;

  @Field()
  @IsInt()
  item_given_id: number;

  @Field()
  @IsBoolean()
  is_npc_married: boolean;

  @Field(() => Location)
  @IsEnum(Location)
  location: Location;

  @Field()
  @IsInt()
  @Min(-8)
  @Max(8)
  affection_points: number;
}
