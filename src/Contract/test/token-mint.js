const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Mint", function () {
  let accounts;
  let contractFactory;
  let token;
  let lucas;

  it("Should be possible for the contract owner to mint new tokens", async function () {
    accounts = await ethers.getSigners();
    contractFactory = await ethers.getContractFactory("Token");
    token = await contractFactory.deploy(5000000, "NiceToken", "NTKN", 18);
    await token.waitForDeployment();
    lucas = accounts[1];

    let totalSupply = await token.totalSupply();
    let lucasBalance = await token.balanceOf(await lucas.getAddress());

    assert.equal(
        totalSupply,
        5000000,
        "Contract has not the correct initial supply"
    );

    assert.equal(
        lucasBalance,
        0,
        "Lucas balance is not initally empty"
    );
    
    await token.mint(await lucas.getAddress(), 10000);

    totalSupply = await token.totalSupply();
    lucasBalance = await token.balanceOf(await lucas.getAddress());

    assert.equal(
        totalSupply,
        5010000,
        "Supply was not correctly increased"
    );

    assert.equal(
        lucasBalance,
        10000,
        "Lucas balance was not correctly updated"
    );
  });

  it("Should not be possible for a regular account to mint new tokens", async function () {
    await expect(token.connect(lucas).mint(await lucas.getAddress(), 15000)).to.be.reverted;
  });
});