import { EntityBase } from "src/common/entity-base.interface";
import { Gift } from "../npc/entity/gift.entity";

export interface ItemBase extends EntityBase {
  name: string;
  isEdible: boolean;
  sellingPrice?: number;
  buyingCost?: number;
  cropGrowthDays?: number;
  cropRegrowthDays?: number;
  gifts: Gift[];
}