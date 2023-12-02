// contracts/token.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is Ownable, ERC20 {
    uint8 private _decimals;

    constructor(
        uint256 initialSupply, 
        string memory tokenName, 
        string memory tokenSymbol, 
        uint8 tokenDecimals) Ownable (msg.sender) ERC20(tokenName, tokenSymbol) {
        _decimals = tokenDecimals;
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function burn(address account, uint256 amount) public onlyOwner returns (bool) {
        _burn(account, amount);
        return true;
    }

    function mint(address account, uint256 amount) public onlyOwner returns (bool) {
        _mint(account, amount);
        return true;
    }
}