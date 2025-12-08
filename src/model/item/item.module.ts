import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Npc } from '../npc/entity/npc.entity';
import { NpcItemPreference } from '../npc/entity/npc-item-preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, NpcItemPreference])],
  providers: [ItemResolver, ItemService],
})
export class ItemModule { }
