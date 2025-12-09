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
  birth_season: Season;

  @Field()
  @Column({ default: 0 })
  affection_points: number;

  @Field(() => [Gift], { nullable: true })
  @OneToMany(() => Gift, gift => gift.receiving_npc)
  gifts: Gift[];
}
