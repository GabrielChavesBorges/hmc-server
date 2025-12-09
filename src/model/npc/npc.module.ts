import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from './entity/gift.entity';
import { Npc } from './entity/npc.entity';
import { NpcResolver } from './npc.resolver';
import { NpcService } from './npc.service';

@Module({
  imports: [TypeOrmModule.forFeature([Npc, Gift])],
  providers: [NpcResolver, NpcService],
})
export class NpcModule { }
