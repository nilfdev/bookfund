const hre = require("hardhat");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("Token");
  const contract = contractFactory.attach(
    "0x3e48793E04F2A51630a2206af4FE21b30F1894Cf" 
  );

  const receiverAddress = "0x40d5cE228763a62cc5370B1A03B76F8Badf0e216";
  const amount = 1;
  const amountContract = BigInt(amount) * (BigInt(10) ** BigInt(18));

  // Now you can call functions of the contract
  await contract.mint(receiverAddress, amountContract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
