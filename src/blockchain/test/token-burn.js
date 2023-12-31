const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Burn", function () {
  let accounts;
  let contractFactory;
  let token;
  let owner;
  let lucas;

  it("Should be possible for the contract owner to burn tokens", async function () {
    accounts = await ethers.getSigners();
    contractFactory = await ethers.getContractFactory("Token");
    token = await contractFactory.deploy(5000000, "NiceToken", "NTKN", 18, 5000000);
    await token.waitForDeployment();
    owner = accounts[0];

    let totalSupply = await token.totalSupply();
    let ownerBalance = await token.balanceOf(await owner.getAddress());

    assert.equal(
        totalSupply,
        5000000,
        "Contract has not the correct initial supply"
    );

    assert.equal(
        ownerBalance,
        5000000,
        "Owner balance has not the correct initial supply"
    );
    
    await token.burn(10000);

    totalSupply = await token.totalSupply();
    ownerBalance = await token.balanceOf(await owner.getAddress());

    assert.equal(
        totalSupply,
        4990000,
        "Supply was not correctly decreased"
    );

    assert.equal(
        ownerBalance,
        4990000,
        "Owner balance was not correctly updated"
    );
  });

  it("Should not be possible for a regular account to burn tokens", async function () {
    lucas = accounts[1];
    await expect(token.connect(lucas).burn(15000)).to.be.reverted;
  });
});