import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNpcInput } from './dto/create-npc.input';
import { UpdateNpcInput } from './dto/update-npc.input';
import { Npc } from './entity/npc.entity';
import { NpcService } from './npc.service';
import { Gift } from './entity/gift.entity';
import { CreateGiftInput } from './dto/create-gift.input';
import { UpdateGiftInput } from './dto/update-gift.input';

@Resolver(() => Npc)
export class NpcResolver {
  constructor(private readonly npcService: NpcService) { }

  @Mutation(() => Npc)
  createNpc(@Args('createNpcInput') createNpcInput: CreateNpcInput) {
    return this.npcService.createNpc(createNpcInput);
  }

  @Query(() => [Npc], { name: 'npcs' })
  findAll() {
    return this.npcService.findAllNpcs();
  }

  @Query(() => Npc, { name: 'npc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.npcService.findOneNpc(id);
  }

  @Mutation(() => Npc)
  updateNpc(
    @Args('id') id: number,
    @Args('updateNpcInput') updateNpcInput: UpdateNpcInput) {
    return this.npcService.updateNpc(id, updateNpcInput);
  }

  @Mutation(() => Boolean)
  deleteNpc(@Args('id', { type: () => Int }) id: number) {
    return this.npcService.deleteNpc(id);
  }

  @Mutation(() => Gift)
  async createGift(
    @Args('createGiftInput') createGiftInput: CreateGiftInput) {
    return this.npcService.createGift(createGiftInput);
  }

  @Mutation(() => Gift)
  async updateGift(
    @Args('id') id: number,
    @Args('updateGiftInput') updateGiftInput: UpdateGiftInput) {
    return this.npcService.updateGift(id, updateGiftInput);
  }

  @Mutation(() => Boolean)
  deleteGift(@Args('id', { type: () => Int }) id: number) {
    return this.npcService.deleteGift(id);
  }
}
