.PHONY: codegen create deploy

NODE_URL = http://localhost:8020
IPFS_URL = http://localhost:5001

codegen:
	@echo "Generating code..."
	graph codegen

create:
	@echo "Creating graph..."
	graph create Marketplace --node $(NODE_URL)

deploy:
	@echo "Deploying graph..."
	graph deploy Marketplace --ipfs $(IPFS_URL) --node $(NODE_URL)

	# graph create Marketplace --node http://localhost:8020
	# graph deploy Marketplace --ipfs http://localhost:5001 --node http://localhost:8020
