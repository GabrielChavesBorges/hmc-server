import { Module } from '@nestjs/common';
import { NpcService } from './npc.service';
import { NpcResolver } from './npc.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Npc } from './npc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Npc])],
  providers: [NpcResolver, NpcService],
})
export class NpcModule { }
