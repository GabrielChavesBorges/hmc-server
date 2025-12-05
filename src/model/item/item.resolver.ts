import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) { }

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemService.update(updateItemInput);
  }

  @Mutation(() => Boolean)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.remove(id);
  }
}
