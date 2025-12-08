import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Npc } from './npc.entity';
import { Item } from 'src/model/item/item.entity';

@ObjectType()
@Entity()
export class NpcItemPreference {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Npc)
  @ManyToOne(() => Npc, npc => npc.itemPreferences, { onDelete: 'CASCADE' })
  npc: Npc;

  @Field(() => Item)
  @ManyToOne(() => Item, item => item.npcPreferences, { onDelete: 'CASCADE'})
  item: Item;

  @Field()
  @Column({ type: 'int', default: 0 })
  likingLevel: number; // -8 to 8 range, this is how many affection points the npc will receive, depends on location (4 locations)
}