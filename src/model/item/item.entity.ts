import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gift } from '../npc/entity/gift.entity';
import { ItemBase } from './item-base.interface';

@ObjectType()
@Entity()
export class Item implements ItemBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isEdible: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sellingPrice: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  buyingCost: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cropGrowthDays: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cropRegrowthDays: number;

  @Field(() => [Gift], { nullable: true })
  @OneToMany(() => Gift, gift => gift.itemGiven)
  gifts: Gift[];
}
