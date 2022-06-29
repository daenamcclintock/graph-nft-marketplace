import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NftMarketplace,
  ItemBought as ItemBoughtEvent,
  ItemDeleted as ItemDeletedEvent,
  ItemListed as ItemListedEvent,
  ItemUpdated as ItemUpdatedEvent
} from "../generated/NftMarketplace/NftMarketplace"

import { ItemListed, ActiveItem, ItemBought, ItemCancelled } from "../generated/schema"

export function handleItemBought(event: ItemBoughtEvent): void {
  // Save that event in our graph
  // Update our active items

  // get or create an itemListed object
  // each item needs a unique Id

  // ItemBoughtEvent: Just the raw event
  // ItemBoughtObject: What we save
  let itemBought = ItemBought.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!itemBought) {
    itemBought = new ItemBought(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  itemBought.buyer = event.params.buyer
  itemBought.nftAddress = event.params.nftAddress
  itemBought.tokenId = event.params.tokenId
  activeItem!.buyer = event.params.buyer

  itemBought.save()
  activeItem!.save()
}

export const handleItemDeleted = (event: ItemDeletedEvent): void => {}

export const handleItemListed = (event: ItemListedEvent): void => {
  let itemListed = ItemListed.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  let activeItem = ActiveItem.load(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))

  if (!itemListed) {
    itemListed = new ItemListed(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  if (!activeItem) {
    activeItem = new ActiveItem(getIdFromEventParams(event.params.tokenId, event.params.nftAddress))
  }

  itemListed.seller = event.params.seller
  activeItem.seller = event.params.seller
}

export const handleItemUpdated = (event: ItemUpdatedEvent): void => {}

const getIdFromEventParams = (tokenID: BigInt, nftAddress: Address): string => {
  return tokenID.toHexString() + nftAddress.toHexString()
}
