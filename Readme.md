docker start -  docker compose up


graph codegen    
graph build    
graph create Marketplace --node http://localhost:8020
graph deploy Marketplace  --ipfs http://localhost:5001 --node http://localhost:8020


forge create ./src/Marketplace.sol:ResourceMarketplace --rpc-url https://virtual.mainnet.rpc.tenderly.co/3a82b8cf-6f83-4bee-91bc-93c8a2bbb4bb --etherscan-api-key OrjruEdeuEoUt0SBakqsS3vpxr6c-wYD  --private-key e62fd5eafc74f599dab28b51ec9718134fe61c35b1b076c07eec832b52d8f547
