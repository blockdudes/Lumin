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

    struct UpdateParams {
        bool updateTitle;
        string title;
        bool updateDescription;
        string description;
        bool updateCategory;
        string category;
        bool updateImageUrl;
        string image_url;
        bool updatePrice;
        uint price;
        bool updateResourceIpfsHash;
        string resourceIpfsHash;
        bool updateAllowListingAccess;
        bool allowListingAccess;
    }

    struct UpdateMarketplaceParams {
        bool updateMarketplaceName;
        string marketplaceName;
        bool updateDescription;
        string description;
        bool updateImageUrl;
        string image_url;
        bool updateCategories;
        string[] categories;
        bool updateTheme;
        string theme;
        bool updateIsOwnedResourcesMarketplace;
        bool isOwnedResourcesMarketplace;
    }

    struct Marketplace {
        address payable owner;
        uint256 feePercent;
        string[] categories;
        bool isOwnedResourcesMarketplace;
        string marketplaceName;
        string description;
        string image_url;
        string theme;
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

    event ResourceAdded(
        uint256 indexed id,
        address creator,
        string title,
        string description,
        string category,
        string image_url,
        uint256 price,
        string resourceIpfsHash,
        bool allowListingAccess,
        bool isUpdating
    );

    event ResourcePurchased(
        uint256 indexed id,
        address buyer,
        uint256 price,
        uint256 feePaid,
        uint256 marketplaceId,
        address creator
    );
    event MarketplaceRegistered(
        uint256 indexed id,
        string marketplaceName,
        string description,
        string image_url,
        address owner,
        uint256 feePercent,
        string[] categories,
        string theme,
        bool isOwnedResourcesMarketplace,
        bool isUpdating
    );

    event MarketplaceFeeUpdated(uint256 indexed id, uint256 newFeePercent);
    event ResourceListingVisibilityChanged(
        uint256 indexed id,
        bool allowListingAccess
    );
    event ResourcePriceChanged(uint256 indexed id, uint256 price);
    event CategoryAddedToMarketplace(uint256 indexed id, string category);

    function addResource(
        string memory title,
        string memory description,
        string memory category,
        string memory image_url,
        string memory resourceIpfsHash,
        bool allowListingAccess,
        uint256 price
    ) external {
        require(categoryExists[category], "Invalid category");

        uint256 resourceId = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, address(this))
            )
        );
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
        emit ResourceAdded(
            resourceId,
            msg.sender,
            title,
            description,
            category,
            image_url,
            price,
            resourceIpfsHash,
            allowListingAccess,
            false
        );
    }

    function updateResource(
        uint256 resourceId,
        UpdateParams memory params
    ) public {
        Resource memory resource = resources[resourceId];
        if (resource.creator != msg.sender) {
            revert Unauthorized();
        }

        if (params.updateTitle) {
            resource.title = params.title;
        }
        if (params.updateDescription) {
            resource.description = params.description;
        }
        if (params.updateCategory) {
            require(categoryExists[params.category], "Invalid category");
            resource.category = params.category;
        }
        if (params.updateImageUrl) {
            resource.image_url = params.image_url;
        }
        if (params.updateResourceIpfsHash) {
            resource.resourceIpfsHash = params.resourceIpfsHash;
        }
        if (params.updateAllowListingAccess) {
            resource.allowListingAccess = params.allowListingAccess;
        }
        if (params.updatePrice) {
            resource.price = params.price;
        }

        resources[resourceId] = resource;

        emit ResourceAdded(
            resourceId,
            msg.sender,
            resource.title,
            resource.description,
            resource.category,
            resource.image_url,
            resource.price,
            resource.resourceIpfsHash,
            resource.allowListingAccess,
            true
        );
    }

    function addCategory(string memory _category) public {
        require(!categoryExists[_category], "Category already exists");
        categories.push(_category);
        categoryExists[_category] = true;
    }

    function changeListingVisiblity(
        uint256 resourceId,
        bool allowListingAccess
    ) public {
        Resource memory resource = resources[resourceId];
        if (resource.creator != msg.sender) {
            revert Unauthorized();
        }
        resource.allowListingAccess = allowListingAccess;
        resources[resourceId] = resource;
        emit ResourceListingVisibilityChanged(resourceId, allowListingAccess);
    }

    function changePrice(uint256 resourceId, uint256 price) public {
        Resource memory resource = resources[resourceId];
        if (resource.creator != msg.sender) {
            revert Unauthorized();
        }
        resource.price = price;
        resources[resourceId] = resource;
        emit ResourcePriceChanged(resourceId, price);
    }

    function purchaseResource(
        uint256 resourceId,
        uint256 marketplaceId
    ) public payable {
        require(resources[resourceId].id != 0, "Resource ID does not exist");
        require(marketplaces[marketplaceId].owner != address(0), "Marketplace ID does not exist");

        Resource memory resource = resources[resourceId];
        Marketplace memory marketplace = marketplaces[marketplaceId];

        uint256 fee = 0;

        if (!marketplace.isOwnedResourcesMarketplace) {
            unchecked {
                fee = (resource.price * marketplace.feePercent) / 100;
            }
        }

        if (msg.value < resource.price) {
            revert InsufficientFunds();
        }

        if (fee > 0) {
            payable(marketplace.owner).transfer(fee);
        }

        payable(resource.creator).transfer(resource.price - fee);

        emit ResourcePurchased(
            resourceId,
            msg.sender,
            resource.price,
            fee,
            marketplaceId,
            resource.creator
        );
    }

    function registerMarketplace(
        uint256 feePercent,
        string memory marketplaceName,
        string memory description,
        string memory image_url,
        string[] memory _categories,
        string memory theme,
        bool isOwnedResourcesMarketplace
    ) external {
        for (uint256 i = 0; i < _categories.length; i++) {
            require(categoryExists[_categories[i]], "Invalid category!!");
        }
        require(feePercent < 10, "Fee percent must be less than 100%");
        if (isOwnedResourcesMarketplace) {
            feePercent = 0;
        }
        uint256 id = uint256(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        );
        marketplaces[id] = Marketplace(
            payable(msg.sender),
            feePercent,
            _categories,
            isOwnedResourcesMarketplace,
            marketplaceName,
            description,
            image_url,
            theme
        );

        emit MarketplaceRegistered(
            id,
            marketplaceName,
            description,
            image_url,
            msg.sender,
            feePercent,
            _categories,
            theme,
            isOwnedResourcesMarketplace,
            false
        );
    }

    function updateMarketplace(
        uint256 marketplaceId,
        UpdateMarketplaceParams memory params
    ) public {
        Marketplace storage marketplace = marketplaces[marketplaceId];
        if (marketplace.owner != msg.sender) {
            revert Unauthorized();
        }

        if (params.updateMarketplaceName) {
            marketplace.marketplaceName = params.marketplaceName;
        }
        if (params.updateDescription) {
            marketplace.description = params.description;
        }
        if (params.updateImageUrl) {
            marketplace.image_url = params.image_url;
        }
        if (params.updateTheme) {
            marketplace.theme = params.theme;
        }
        if (params.updateCategories) {
            for (uint256 i = 0; i < params.categories.length; i++) {
                require(
                    categoryExists[params.categories[i]],
                    "Invalid category!!"
                );
            }
            marketplace.categories = params.categories;
        }
        if (params.updateIsOwnedResourcesMarketplace) {
            marketplace.isOwnedResourcesMarketplace = params
                .isOwnedResourcesMarketplace;
        }

        emit MarketplaceRegistered(
            marketplaceId,
            marketplace.marketplaceName,
            marketplace.description,
            marketplace.image_url,
            msg.sender,
            marketplace.feePercent,
            marketplace.categories,
            marketplace.theme,
            marketplace.isOwnedResourcesMarketplace,
            true
        );
    }

    function addCategorytoMarketplace(
        uint256 marketplaceId,
        string memory category
    ) external {
        if (msg.sender != marketplaces[marketplaceId].owner) {
            revert Unauthorized();
        }

        if (!categoryExists[category]) {
            revert CategoryNotFound();
        }
        emit CategoryAddedToMarketplace(marketplaceId, category);
    }

    function updateMarketplaceFee(
        uint256 marketplaceId,
        uint256 newFeePercent
    ) external {
        address owner = marketplaces[marketplaceId].owner;
        if (msg.sender != owner) {
            revert Unauthorized();
        }
        marketplaces[marketplaceId].feePercent = newFeePercent;
        emit MarketplaceFeeUpdated(marketplaceId, newFeePercent);
    }

    function getResourcesByOwner(
        address owner
    ) public view returns (uint256[] memory) {
        return ownedResources[owner];
    }

    function getResource(
        uint256 resourceId
    ) public view returns (Resource memory) {
        return resources[resourceId];
    }

    function getCategories() public view returns (string[] memory) {
        return categories;
    }
}
