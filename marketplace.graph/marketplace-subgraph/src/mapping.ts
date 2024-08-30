import { BigInt, Bytes, log, store } from '@graphprotocol/graph-ts';
import { MarketplaceABI, MarketplaceRegistered, ResourceAdded, ResourcePurchased, ResourcePriceChanged, ResourceListingVisibilityChanged, MarketplaceFeeUpdated, CategoryAddedToMarketplace } from '../generated/Marketplace/MarketplaceABI';
import { Resource as ResourceEntity, Marketplace as MarketplaceEntity, Purchase, User } from "../generated/schema"


export function handleResourceCreated(event: ResourceAdded): void {
    let userId = Bytes.fromHexString(event.transaction.from.toHex());
    let user = User.load(userId);
    if (user == null) {
      user = new User(userId);
      user.id = userId;
      user.save();
    }

    let resource = ResourceEntity.load(event.params.id.toString());
    if (resource == null) {
      resource = new ResourceEntity(event.params.id.toString());
      resource.creator = user.id;
      resource.id = event.params.id.toString();
      resource.transactionDate = event.block.timestamp; 
    } else if (!event.params.isUpdating) {
      log.info('Attempt to recreate existing resource without updating flag: {},{}', [event.params.id.toString(),event.params.isUpdating.toString()]);
      return;
    }

    // Update fields regardless of new creation or update
    resource.allowListingAccess = event.params.allowListingAccess;
    resource.price = event.params.price;
    resource.category = event.params.category;
    resource.image_url = event.params.image_url;
    resource.isUpdating = event.params.isUpdating;
    resource.title = event.params.title;
    resource.description = event.params.description;
    resource.resourceHash = event.params.resourceIpfsHash;
    resource.save();

    log.info('Resource processed with ID: {},{},{},{}', [event.params.id.toString(),event.params.title, event.params.description, event.params.isUpdating.toString()]);
  }

export function handleResourcePurchased(event: ResourcePurchased): void {
  let uniquePurchaseId = event.block.timestamp.toString() + '-' + event.transaction.hash.toHexString();
  let entity = new Purchase(uniquePurchaseId);
  let buyer = User.load(Bytes.fromHexString(event.params.buyer.toHexString()));
  if (buyer == null) {
    buyer = new User(Bytes.fromHexString(event.params.buyer.toHexString()));
    buyer.id = Bytes.fromHexString(event.params.buyer.toHexString());
    buyer.save();
  }
  entity.buyer = buyer.id;
  entity.price = event.params.price;
  entity.marketplace = event.params.marketplaceId.toString();
  entity.transactionDate = event.block.timestamp;
  entity.resource = event.params.id.toString();
  entity.owner = event.params.creator;
  entity.feePaid = event.params.feePaid;
  entity.userEarned = event.params.price.minus(event.params.feePaid);

  entity.save();
  log.info('Purchase created with ID: {}', [event.params.id.toString()]);
}

// export function handleMarketplaceRegistered(event: MarketplaceRegistered): void {
//   let entity = new MarketplaceEntity(event.params.id.toString());

//   entity.id = event.params.id.toString();

//   let user = User.load(Bytes.fromHexString(event.transaction.from.toHex()));
//   if (user === null) {
//     user = new User(Bytes.fromHexString(event.transaction.from.toHex()));
//     user.id = Bytes.fromHexString(event.transaction.from.toHex());
//     user.save();
//   }

//   entity.owner = user.id;
//   entity.feePercent = event.params.feePercent;
//   entity.createdAt = event.block.timestamp;
//   entity.marketplaceName = event.params.marketplaceName;
//   entity.image_url = event.params.image_url;
//   entity.categories = event.params.categories;
//   entity.isOwnedResourcesMarketplace = event.params.isOwnedResourcesMarketplace
//   entity.description = event.params.description

//   entity.save();

//   log.info('Marketplace created with ID: {} and owner ID: {}', [event.params.id.toString(), entity.owner.toHex()]);
// }

export function handleMarketplaceRegistered(event: MarketplaceRegistered): void {
  let userId = Bytes.fromHexString(event.transaction.from.toHex());
  let user = User.load(userId);
  if (user == null) {
    user = new User(userId);
    user.id = userId;
    log.info('Creating new user with ID: {}', [userId.toString()]);
    user.save();
  }

  let marketplaceId = event.params.id.toString();
  let entity = MarketplaceEntity.load(marketplaceId);

  if (entity === null) {
    entity = new MarketplaceEntity(marketplaceId);
    entity.createdAt = event.block.timestamp;
    log.info('Creating new marketplace with ID: {}', [marketplaceId]);
  } else {
    log.info('Updating existing marketplace with ID: {}', [marketplaceId]);
  }

  entity.owner = event.params.owner;
  entity.feePercent = event.params.feePercent;
  entity.marketplaceName = event.params.marketplaceName;
  entity.image_url = event.params.image_url;
  entity.categories = event.params.categories;
  entity.isOwnedResourcesMarketplace = event.params.isOwnedResourcesMarketplace;
  entity.description = event.params.description;
  entity.theme = event.params.theme; 

  entity.save();

  log.info('Marketplace processed with ID: {} and owner ID: {}', [marketplaceId, entity.owner.toString()]);
}


export function handleResourcePriceChanged(event: ResourcePriceChanged): void {

  let entity = ResourceEntity.load(event.params.id.toString());
  if (entity == null) {
    return;
  }
  entity.price = event.params.price;
  entity.save();

  log.info('Resource price changed to: {}', [event.params.price.toString()]);
}

export function handleResourceListingVisibilityChanged(event: ResourceListingVisibilityChanged): void {

  let entity = ResourceEntity.load(event.params.id.toString());
  if (entity == null) {
    return;
  }
  entity.allowListingAccess = event.params.allowListingAccess;
  entity.save();

  log.info('Resource listing visibility changed to: {}', [event.params.allowListingAccess.toString()]);
}


export function handleMarketplaceFeeUpdated(event: MarketplaceFeeUpdated): void {

  let entity = MarketplaceEntity.load(event.params.id.toString());
  if (entity == null) {
    return;
  }
  entity.feePercent = event.params.newFeePercent;
  entity.save();

  log.info('Marketplace fee updated to: {}', [event.params.newFeePercent.toString()]);
}

export function handleCategoryAddedToMarketplace(event: CategoryAddedToMarketplace): void {
  let entity = MarketplaceEntity.load(event.params.id.toString());
  if (entity == null) {
    return;
  }
  entity.categories.push(event.params.category);
  entity.save();

  log.info('Category added to marketplace: {}', [event.params.category]);
}




