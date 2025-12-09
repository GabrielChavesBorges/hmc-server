import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNpcInput } from './dto/create-npc.input';
import { UpdateNpcInput } from './dto/update-npc.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Npc } from './entity/npc.entity';
import { Repository } from 'typeorm';
import { CreateGiftInput } from './dto/create-gift.input';
import { Gift } from './entity/gift.entity';
import { UpdateGiftInput } from './dto/update-gift.input';

@Injectable()
export class NpcService {
  constructor(
    @InjectRepository(Npc)
    private npcRepository: Repository<Npc>,

    @InjectRepository(Gift)
    private giftRepository: Repository<Gift>,
  ) { }

  createNpc(createNpcInput: CreateNpcInput): Promise<Npc> {
    const npc = this.npcRepository.create(createNpcInput);
    return this.npcRepository.save(npc);
  }

  async findAllNpcs(): Promise<Npc[]> {
    return await this.npcRepository.find({
      relations: ['gifts', 'gifts.itemGiven'],
    });
  }

  async findOneNpc(id: number) {
    const npc = await this.npcRepository.findOne({
      where: { id },
      relations: ['gifts', 'gifts.itemGiven'],
    });
    if (!npc) {
      throw new NotFoundException(`Npc ${id} not found.`);
    }
    return npc;
  }

  async updateNpc(id:number, changes: UpdateNpcInput) {
    await this.npcRepository.update(id, changes);
    return this.npcRepository.findOneBy({ id });
  }

  async deleteNpc(id: number) {
    const npcToDelete = await this.npcRepository.findOneBy({ id });
    if (!npcToDelete) {
      throw new NotFoundException(`Npc id:${id} not found.`);
    }
    await this.npcRepository.remove(npcToDelete);
    return true;
  }

  async createGift(createGiftInput: CreateGiftInput) {
    const newGift = this.giftRepository.create({
      receivingNpc: { id: createGiftInput.receivingNpcId },
      itemGiven: { id: createGiftInput.itemGivenId },
      isNpcMarried: createGiftInput.isNpcMarried,
      location: createGiftInput.location,
      affectionPoints: createGiftInput.affectionPoints
    });

    const { id: newId } = await this.giftRepository.save(newGift);
    return await this.giftRepository.findOne ({
      where: { id: newId },
      relations: ['receivingNpc', 'itemGiven'],
    });
  }

  async updateGift(id: number, changes: UpdateGiftInput) {
    await this.giftRepository.update(id, changes);
    return await this.giftRepository.findOneBy({ id });
  }

  async deleteGift(giftId: number) {
    const giftToDelete = await this.npcRepository.findOneBy({ id: giftId });
    if (!giftToDelete) {
      throw new NotFoundException(`Npc id:${giftId} not found.`);
    }
    await this.npcRepository.remove(giftToDelete);
    return true;
  }
}
