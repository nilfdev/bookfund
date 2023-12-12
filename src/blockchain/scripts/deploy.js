const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const initialSupply = BigInt(1000000) * (BigInt(10) ** BigInt(18));
  const totalSupply = BigInt(100000000) * (BigInt(10) ** BigInt(18));
 
  const token = await hre.ethers.deployContract("Token", [initialSupply, "LitCoin", "LIT", 18, totalSupply]);
  await token.waitForDeployment();
  console.log(`Deployed to ${token.target}; Address: ${await token.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
