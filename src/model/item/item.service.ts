import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) { }

  create(createItemInput: CreateItemInput): Promise<Item> {
    const item = this.itemRepository.create(createItemInput);
    return this.itemRepository.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item ${id} not found.`);
    }
    return item;
  }

  async update(id: number, changes: UpdateItemInput) {
    await this.itemRepository.update(id, changes);
    return this.itemRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const itemToDelete = await this.itemRepository.findOneBy({ id });
    if (!itemToDelete) {
      throw new NotFoundException(`Item ${id} not found.`);
    }
    await this.itemRepository.remove(itemToDelete);
    return true;
  }
}
