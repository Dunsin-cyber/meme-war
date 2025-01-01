// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeToken is ERC20 {
    address public memeCreator;

    uint256 public priceFactor;
    uint256 public initialSupply;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _priceFactor,
        uint256 _initialSupply
    ) ERC20(name, symbol) {
        memeCreator = msg.sender;
        priceFactor = _priceFactor;
        initialSupply = _initialSupply;
        _mint(msg.sender, initialSupply); // Mint initial supply to the creator
    }

    function setPriceFactor(uint256 _newPriceFactor) external {
        require(msg.sender == memeCreator, "Only the meme creator can update the price factor");
        priceFactor = _newPriceFactor;
    }

    function buyTokens() external payable {
        require(msg.value > 0, "You need to send bnb to buy tokens");
        
        uint256 tokensToMint = calculatePurchaseReturn(msg.value);
        _mint(msg.sender, tokensToMint);
    }

    function calculatePurchaseReturn(uint256 bnbAmount) public view returns (uint256) {
        return bnbAmount * priceFactor;
    }

    // Function to retrieve token balance
    function getBalance() external view returns (uint256) {
        return balanceOf(msg.sender);
    }
}


// MemeCulture has 2 main approach to it. It is gonna be deployed to the BNB SmartChain.
// 1. MemeWar
// 2. MemeTokenWar
// On the platform memes are created by users and can decide to go to war against other creators.
// On the basis of MemeWar, the users creates a meme and then creates a memewar challenge, so a user interested in the challenge and the milestones set(maybe twitter likes or youtube likes or votes) will accept the challenge with his own meme as well. There will be a wager in BNB or any other token set by the creator. So both parties wagers are then sent to the smart contract. After the duration has ended or milestone is completed by one first, the winner takes all the wager and the war is marked ended. 
// On the basis of MemeTokenWar, a meme creator can decides to create a memeToken challenge where an erc20 token is dynamically created for the token, so a user interested in the challenge will join the challenge with their meme, create their own token and then go to war againt the creator. Both tokens are locked and the challengers are to do their marketing. So pther users can come around to purchase memeToken to boost the marketcap of the token. Apply a simple bonding curve approach for the pricing. The one with the highest marketcap throughout the duration. 
