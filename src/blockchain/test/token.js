const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Token Setup", function () {
  let accounts;
  let contractFactory;
  let token;
  let owner;

  it("Should have the correct setup", async function () {
    accounts = await ethers.getSigners();
    contractFactory = await ethers.getContractFactory("Token");
    token = await contractFactory.deploy(5000000, "NiceToken", "NTKN", 18, 5000001);
    await token.waitForDeployment();
    owner = accounts[0];
    const supply = await token.totalSupply();
    const ownerBalance = await token.balanceOf(await owner.getAddress());
    const tokenName = await token.name();
    const tokenSymbol = await token.symbol();
    const tokenDecimals = await token.decimals();
    const totalCap = await token.cap();

    assert.equal(supply, 5000000, "Initial supply was not the same as in migration");
    assert.equal(ownerBalance, 5000000, "Owner has not all tokens at begining");
    assert.equal(tokenName, "NiceToken", "Contract has not the correct name");
    assert.equal(tokenSymbol, "NTKN", "Contract has not the correct symbol");
    assert.equal(tokenDecimals, 18, "Contract decimals is not correct");
    assert.equal(totalCap, 5000001, "Contract decimals is not correct");
    
  });
});