import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NpcItemPreference } from '../npc/entity/npc-item-preference.entity';

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
  is_edible: boolean;

  @Field(() => [NpcItemPreference], { nullable: true })
  @OneToMany(() => NpcItemPreference, preference => preference.item)
  npcPreferences: NpcItemPreference[];
}
