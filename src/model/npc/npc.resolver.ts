import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NpcService } from './npc.service';
import { Npc } from './npc.entity';
import { CreateNpcInput } from './dto/create-npc.input';
import { UpdateNpcInput } from './dto/update-npc.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Npc)
export class NpcResolver {
  constructor(private readonly npcService: NpcService) { }

  @Mutation(() => Npc)
  createNpc(@Args('createNpcInput') createNpcInput: CreateNpcInput) {
    return this.npcService.create(createNpcInput);
  }

  @Query(() => [Npc], { name: 'npcs' })
  findAll() {
    return this.npcService.findAll();
  }

  @Query(() => Npc, { name: 'npc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.npcService.findOne(id);
  }

  @Mutation(() => Npc)
  updateNpc(@Args('updateNpcInput') updateNpcInput: UpdateNpcInput) {
    return this.npcService.update(updateNpcInput);
  }

  @Mutation(() => Boolean)
  removeNpc(@Args('id', { type: () => Int }) id: number) {
    return this.npcService.remove(id);
  }
}
