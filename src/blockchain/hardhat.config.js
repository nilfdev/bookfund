require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploys Token.sol contract").setAction(async function (
  taskArguments,
  hre
) {
  const [deployer] = await hre.ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("Token", deployer);
  const token = await Token.deploy(5000000, "NiceToken", "NTKN", 18, 5000001);
  await token.waitForDeployment();
  console.log(`Token Contract deployed to address: ${await token.getAddress()}`);
});

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
