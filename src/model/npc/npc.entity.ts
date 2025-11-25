import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Season } from 'src/common/season.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
