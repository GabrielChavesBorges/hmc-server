import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, Length, Min } from 'class-validator';
import { ItemBase } from '../item-base.interface';

@InputType()
export class CreateItemInput implements Partial<ItemBase> {
  @Field()
  @IsString()
  @Length(1, 31)
  name: string;

  @Field()
  @IsBoolean()
  isEdible: boolean;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  sellingPrice?: number;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  buyingCost?: number;

  @Field({ nullable: true })
  cropGrowthDays?: number;

  @Field({ nullable: true })
  cropRegrowthDays?: number;
}
