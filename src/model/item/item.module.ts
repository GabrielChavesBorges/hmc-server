import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from '../npc/entity/gift.entity';
import { Item } from './item.entity';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Gift])],
  providers: [ItemResolver, ItemService],
})
export class ItemModule { }
