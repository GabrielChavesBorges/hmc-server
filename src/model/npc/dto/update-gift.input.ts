import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateGiftInput } from './create-gift.input';

@InputType()
export class UpdateGiftInput extends PartialType(
    OmitType(CreateGiftInput, ['receivingNpcId', 'itemGivenId'] as const)
) { }
