// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeToken is ERC20 {
    address public creator;
    uint256 public tokensSold;
    uint256 public constant BASE_PRICE = 0.01 ether;
    uint256 public constant INCREMENT = 0.001 ether;

    mapping(address => uint256) public lockedBalances;
    address[] public holders;

    constructor(string memory name, string memory symbol, address _creator) ERC20(name, symbol) {
        creator = _creator;
        _mint(_creator, 1000 * 10 ** decimals()); // Initial supply for creator
    }

    function calculatePrice() public view returns (uint256) {
        return BASE_PRICE + (INCREMENT * (tokensSold / 100));
    }

    function buyTokens(uint256 amount) external payable {
        uint256 cost = calculatePrice() * amount;
        require(msg.value == cost, "Incorrect payment amount");

        tokensSold += amount;
        _mint(msg.sender, amount);

        if (lockedBalances[msg.sender] == 0) {
            holders.push(msg.sender); // Track the new holder
        }
        lockedBalances[msg.sender] += amount; // Lock the tokens
    }

    function transferAll(address toToken) external {
        MemeToken targetToken = MemeToken(toToken);

        uint256 totalLocked = totalSupply();
        require(totalLocked > 0, "No tokens to transfer");

        for (uint256 i = 0; i < holders.length; i++) {
            address holder = holders[i];
            uint256 balance = lockedBalances[holder];

            if (balance > 0) {
                uint256 reward = (balance * targetToken.totalSupply()) / totalLocked;
                targetToken.mint(holder, reward); // Reward proportional tokens
                lockedBalances[holder] = 0; // Clear the locked balance
            }
        }
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == creator, "Only the creator can mint");
        _mint(to, amount);
    }
}
