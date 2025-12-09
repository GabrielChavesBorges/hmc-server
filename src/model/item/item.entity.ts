import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gift } from '../npc/entity/gift.entity';

@ObjectType()
@Entity()
export class Item {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isEdible: boolean;

  @Field(() => [Gift], { nullable: true })
  @OneToMany(() => Gift, gift => gift.itemGiven)
  gifts: Gift[];
}
