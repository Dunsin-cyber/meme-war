// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract BondingCurve {
    uint256 public totalSupply;
    uint256 public constant c = 1e18; // Scaling factor for price
    
    // Calculates price based on a linear bonding curve
    function getPrice(uint256 _supply) public pure returns (uint256) {
        return c * _supply;
    }

    // Buy tokens
    function buy(uint256 numTokens) external payable {
        uint256 price = getPrice(totalSupply + numTokens);
        require(msg.value >= price, "Insufficient ETH sent");
        
        totalSupply += numTokens;
    }

    // Sell tokens
    function sell(uint256 numTokens) external {
        require(totalSupply >= numTokens, "Not enough tokens to sell");
        
        uint256 refund = getPrice(totalSupply) - getPrice(totalSupply - numTokens);
        totalSupply -= numTokens;
        
        payable(msg.sender).transfer(refund);
    }
}
