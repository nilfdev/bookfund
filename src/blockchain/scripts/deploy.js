const hre = require("hardhat");

async function main() {
  const token = await hre.ethers.deployContract("Token", [5000000, "NiceToken", "NTKN", 18, 5000001]);
  await token.waitForDeployment();
  console.log(`Deployed to ${token.target}; Address: ${await token.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
