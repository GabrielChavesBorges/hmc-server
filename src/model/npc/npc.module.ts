import { Module } from '@nestjs/common';
import { NpcService } from './npc.service';
import { NpcResolver } from './npc.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Npc } from './entity/npc.entity';
import { NpcItemPreference } from './entity/npc-item-preference.entity';
import { Item } from '../item/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Npc, NpcItemPreference])],
  providers: [NpcResolver, NpcService],
})
export class NpcModule { }
