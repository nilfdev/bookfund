require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();
require("ethers")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// task("deploy", "Deploys Token.sol contract").setAction(async function (
//   taskArguments,
//   hre
// ) {
//   const [deployer] = await hre.ethers.getSigners();
//   const Token = await hre.ethers.getContractFactory("Token", deployer);
//   const token = await Token.deploy(5000000, "LitCoin", "NTKN", 18, 5000001);
//   await token.waitForDeployment();
//   console.log(`Token Contract deployed to address: ${await token.getAddress()}`);
// });

// task("mint", "Mint extra tokens", async (taskArgs, hre) => {
//   const contractFactory = await hre.ethers.getContractFactory("Token");
//   const contract = contractFactory.attach(
//     "0x3e48793E04F2A51630a2206af4FE21b30F1894Cf" 
//   );

//   const receiverAddress = "0x40d5cE228763a62cc5370B1A03B76F8Badf0e216"
//   const amount = 1

//   // Now you can call functions of the contract
//   await contract.mint(receiverAddress, amount);
// });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    sepolia: {
      chainId: parseInt(process.env.CHAIN_ID),
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: [process.env.COINMARKETCAP]
  }
};
