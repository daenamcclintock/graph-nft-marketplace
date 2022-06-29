import { BigInt } from "@graphprotocol/graph-ts"
import {
  NftMarketplace,
  ItemBought,
  ItemDeleted,
  ItemListed,
  ItemUpdated
} from "../generated/NftMarketplace/NftMarketplace"
import { ExampleEntity } from "../generated/schema"

export function handleItemBought(event: ItemBought): void {}

export function handleItemDeleted(event: ItemDeleted): void {}

export function handleItemListed(event: ItemListed): void {}

export function handleItemUpdated(event: ItemUpdated): void {}
