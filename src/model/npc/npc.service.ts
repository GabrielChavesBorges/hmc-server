import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNpcInput } from './dto/create-npc.input';
import { UpdateNpcInput } from './dto/update-npc.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Npc } from './entity/npc.entity';
import { Repository } from 'typeorm';
import { CreateGiftInput } from './dto/create-gift.input';
import { Gift } from './entity/gift.entity';

@Injectable()
export class NpcService {
  constructor(
    @InjectRepository(Npc)
    private npcRepository: Repository<Npc>,

    @InjectRepository(Gift)
    private itemPreferenceRepository: Repository<Gift>,
  ) { }

  create(createNpcInput: CreateNpcInput): Promise<Npc> {
    const npc = this.npcRepository.create(createNpcInput);
    return this.npcRepository.save(npc);
  }

  findAll(): Promise<Npc[]> {
    return this.npcRepository.find({
      relations: ['gifts', 'gifts.item_given'],
    });
  }

  async findOne(id: number) {
    const npc = await this.npcRepository.findOne({
      where: { id },
      relations: ['gifts', 'gifts.item_given'],
    });
    if (!npc) {
      throw new NotFoundException(`Npc ${id} not found.`);
    }
    return npc;
  }

  async update(updateNpcInput: UpdateNpcInput) {
    const { id, ...changes } = updateNpcInput;
    await this.npcRepository.update(id, changes);
    return this.npcRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const npcToDelete = await this.npcRepository.findOneBy({ id });
    if (!npcToDelete) {
      throw new NotFoundException(`Npc ${id} not found.`);
    }
    await this.npcRepository.remove(npcToDelete);
    return true;
  }

  async createGift(createGiftInput: CreateGiftInput) {
    const newGift = this.itemPreferenceRepository.create({
      receiving_npc: { id: createGiftInput.receiving_npc_id },
      item_given: { id: createGiftInput.item_given_id },
      is_npc_married: createGiftInput.is_npc_married,
      location: createGiftInput.location,
      affection_points: createGiftInput.affection_points
    });

    const { id: newId } = await this.itemPreferenceRepository.save(newGift);
    return await this.itemPreferenceRepository.findOne ({
      where: { id: newId },
      relations: ['receiving_npc', 'item_given'],
    });
  }
}
