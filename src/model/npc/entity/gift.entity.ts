import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Npc } from './npc.entity';
import { Item } from 'src/model/item/item.entity';
import { Location } from 'src/common/location.enum';

@ObjectType()
@Entity()
export class Gift {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Npc)
  @ManyToOne(() => Npc, npc => npc.gifts, { onDelete: 'CASCADE' })
  receivingNpc: Npc;

  @Field(() => Item)
  @ManyToOne(() => Item, item => item.gifts, { onDelete: 'CASCADE'})
  itemGiven: Item;

  @Field()
  @Column()
  isNpcMarried: boolean;

  @Field(() => Location)
  @Column()
  location: Location;

  @Field()
  @Column()
  affectionPoints: number;
}