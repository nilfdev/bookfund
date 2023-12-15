# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test

REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js

DEPLOY
via deploy
npx hardhat run scripts/deploy.js --network sepolia

via config
npx hardhat deploy --network sepolia
npx hardhat mint --network sepolia

```

verify contract 

```
npx hardhat verify --network mainnet --constructor-args arguments.js 0xd06e0317d437d6b80d6a0493b7ea24b36b5b50c9
```
