import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNpcInput } from './dto/create-npc.input';
import { UpdateNpcInput } from './dto/update-npc.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Npc } from './entity/npc.entity';
import { Repository } from 'typeorm';
import { NpcItemPreference } from './entity/npc-item-preference.entity';

@Injectable()
export class NpcService {
  constructor(
    @InjectRepository(Npc)
    private npcRepository: Repository<Npc>,

    @InjectRepository(NpcItemPreference)
    private itemPreferenceRepository: Repository<NpcItemPreference>,
  ) { }

  create(createNpcInput: CreateNpcInput): Promise<Npc> {
    const npc = this.npcRepository.create(createNpcInput);
    return this.npcRepository.save(npc);
  }

  findAll(): Promise<Npc[]> {
    return this.npcRepository.find({
      relations: ['itemPreferences', 'itemPreferences.item'],
    });
  }

  async findOne(id: number) {
    const npc = await this.npcRepository.findOne({
      where: { id },
      relations: ['itemPreferences', 'itemPreferences.item'],
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

  async addItemPreference(npcId: number, itemId: number, likingLevel: number) {
      const newItemPreference = this.itemPreferenceRepository.create({
      npc: { id: npcId },
      item: { id: itemId },
      likingLevel,
    });

    const { id: newId } = await this.itemPreferenceRepository.save(newItemPreference);
    return await this.itemPreferenceRepository.findOne ({
      where: { id: newId },
      relations: ['npc', 'item'],
    });
  }
}
