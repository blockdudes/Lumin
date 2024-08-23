// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ResourceMarketplace {
    struct Resource {
        uint256 id;
        address payable creator;
        string title;
        string description;
        string category;
        string image_url;
        string resourceIpfsHash;
        bool allowListingAccess;
        uint256 price;
    }

    struct Marketplace {
        address payable owner;
        uint256 feePercent;
        string[] _categories;
        bool isOwnedResourcesMarketplace;
    }

    error ResourceNotFound();
    error MarketplaceNotFound();
    error InsufficientFunds();
    error Unauthorized();
    error CategoryNotFound();
    

    mapping(uint256 => Resource) public resources;
    mapping(address => uint256[]) public ownedResources;
    mapping(uint256 => Marketplace) public marketplaces;
    string[] public categories;
    mapping(string => bool) public categoryExists;

    event ResourceAdded(uint256 indexed id, address creator, string title, string description, string category,string image_url, uint256 price, string resourceIpfsHash, bool allowListingAccess);
    event ResourcePurchased(uint256 indexed id, address buyer, uint256 price, uint256 marketplaceId, address creator);
    event MarketplaceRegistered(uint256 indexed id, string marketplaceName,string description, string image_url, address owner, uint256 feePercent,string[] categories, bool isOwnedResourcesMarketplace);
    event MarketplaceFeeUpdated(uint256 indexed id, uint256 newFeePercent);
    event ResourceListingVisibilityChanged(uint256 indexed id, bool allowListingAccess);
    event ResourcePriceChanged(uint256 indexed id, uint256 price);
    event CategoryAddedToMarketplace(uint256 indexed id, string category);


    function addResource(string memory title, string memory description,string memory category, string memory image_url, string memory resourceIpfsHash, bool allowListingAccess, uint256 price) external {

        require(categoryExists[category], "Invalid category");

        uint256 resourceId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, address(this))));
        resources[resourceId] = Resource(
            resourceId,
            payable(msg.sender),
            title,
            description,
            category,
            image_url,
            resourceIpfsHash,
            allowListingAccess,
            price
        );
        ownedResources[msg.sender].push(resourceId);
        emit ResourceAdded(resourceId, msg.sender, title, description,category,image_url, price, resourceIpfsHash, allowListingAccess);
    }

    function addCategory(string memory _category) public {
        require(!categoryExists[_category], "Category already exists");
        categories.push(_category);
        categoryExists[_category] = true;
    }

    function changeListingVisiblity (uint256 resourceId, bool allowListingAccess) public {
        Resource memory resource = resources[resourceId];
        if (resource.creator != msg.sender) {
            revert Unauthorized();
        }
        resource.allowListingAccess = allowListingAccess;
        resources[resourceId] = resource;
        emit ResourceListingVisibilityChanged(resourceId, allowListingAccess);
    }

    function changePrice (uint256 resourceId, uint256 price) public {
        Resource memory resource = resources[resourceId];
        if (resource.creator != msg.sender) {
            revert Unauthorized();
        }
        resource.price = price;
        resources[resourceId] = resource;
        emit ResourcePriceChanged(resourceId, price);
    }


    function purchaseResource(uint256 resourceId, uint256 marketplaceId) public payable {
        Resource memory resource = resources[resourceId];
        if (msg.value < resource.price ) {
            revert InsufficientFunds();
        }

        uint256 fee = 0;
        uint256 netPayment = msg.value;

        if (marketplaceId != 0 && marketplaces[marketplaceId].owner != address(0)) {
            Marketplace memory marketplace = marketplaces[marketplaceId];
            fee = (resource.price * marketplace.feePercent) / 10000;
            netPayment = resource.price - fee;
            payable(marketplace.owner).transfer(fee);
        }

        resource.creator.transfer(netPayment);
        resources[resourceId] = resource;
        ownedResources[msg.sender].push(resourceId);

        emit ResourcePurchased(resourceId, msg.sender, resource.price, marketplaceId, resource.creator);

    }

     function registerMarketplace(uint256 feePercent, string memory marketplaceName,string memory description, string memory image_url , string[] memory _categories, bool isOwnedResourcesMarketplace ) external {
        for (uint256 i = 0; i < _categories.length; i++) {
            require(categoryExists[_categories[i]], "Invalid category!!");
        }
        require(feePercent < 10, "Fee percent must be less than 100%");
        uint256 id = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
        marketplaces[id] = Marketplace(payable(msg.sender), feePercent,_categories, isOwnedResourcesMarketplace);
        emit MarketplaceRegistered(id,marketplaceName,description,image_url, msg.sender, feePercent,_categories, isOwnedResourcesMarketplace);
    }

    function addCategorytoMarketplace(uint256 marketplaceId, string memory category) external {
       if (msg.sender != marketplaces[marketplaceId].owner ) {
            revert Unauthorized();
        }

        if (!categoryExists[category]) {
            revert CategoryNotFound();
        }
        emit CategoryAddedToMarketplace(marketplaceId, category);
    }


    function updateMarketplaceFee(uint256 marketplaceId, uint256 newFeePercent) external {
        if (msg.sender != marketplaces[marketplaceId].owner ) {
            revert Unauthorized();
        }
        marketplaces[marketplaceId].feePercent = newFeePercent;
        emit MarketplaceFeeUpdated(marketplaceId, newFeePercent);
    }

    function getResourcesByOwner(address owner) public view returns (uint256[] memory) {
        return ownedResources[owner];
    }

    function getResource(uint256 resourceId) public view returns (Resource memory) {
        return resources[resourceId];
    }


    function getCategories() public view returns (string[] memory) {
        return categories;
    }
}