import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNpcInput } from './dto/create-npc.input';
import { UpdateNpcInput } from './dto/update-npc.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Npc } from './npc.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NpcService {
  constructor(
    @InjectRepository(Npc)
    private npcRepository: Repository<Npc>,
  ) { }

  create(createNpcInput: CreateNpcInput): Promise<Npc> {
    const npc = this.npcRepository.create(createNpcInput);
    return this.npcRepository.save(npc);
  }

  findAll(): Promise<Npc[]> {
    return this.npcRepository.find();
  }

  async findOne(id: number) {
    const npc = await this.npcRepository.findOneBy({ id });
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
}
