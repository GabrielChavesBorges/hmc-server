import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Season } from 'src/common/season.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gift } from './gift.entity';

@ObjectType()
@Entity()
export class Npc {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Season)
  @Column({
    type: 'enum',
    enum: Season,
  })
  birthSeason: Season;

  @Field()
  @Column({ default: 0 })
  affectionPoints: number;

  @Field(() => [Gift], { nullable: true })
  @OneToMany(() => Gift, gift => gift.receivingNpc)
  gifts: Gift[];
}
