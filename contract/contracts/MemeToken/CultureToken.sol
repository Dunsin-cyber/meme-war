// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeToken is ERC20 {
    address public creator;
    uint256 public lockedSupply;
    uint256 public circulatingSupply;
    uint256 public saleTarget;
    uint256 public totalSold;

    mapping(address => uint256) public purchases;
    address[] public participants;

    constructor(
        string memory name,
        string memory symbol,
        address _creator,
        uint256 _saleTarget
    ) ERC20(name, symbol) {
        require(_saleTarget > 0, "Sale target must be greater than zero");

        creator = _creator;
        saleTarget = _saleTarget;

        uint256 totalSupply = 1000000 * 10 ** decimals(); 
        circulatingSupply = totalSupply / 2; // Half for circulation
        lockedSupply = totalSupply / 2; // Half locked for airdrop

        _mint(address(this), circulatingSupply); // Mint circulating supply to contract
        _mint(creator, lockedSupply); // Lock the other half with creator
    }

    function calculatePrice() public view returns (uint256) {
        return 0.01 ether + (totalSold * 0.0001 ether); // simple linear pricing
    }

    function buyTokens(uint256 amount) external payable {
        uint256 cost = calculatePrice() * amount;
        require(msg.value == cost, "Incorrect payment");
        require(balanceOf(address(this)) >= amount, "Not enough tokens available");

        totalSold += amount;
        purchases[msg.sender] += amount;
        if (purchases[msg.sender] == amount) {
            participants.push(msg.sender); // Track first-time buyers
        }

        _transfer(address(this), msg.sender, amount); // Transfer tokens to buyer
    }

    function airdropLockedTokens() external {
        uint256 totalPurchased = totalSold;
        require(totalPurchased > 0, "No tokens purchased");

        for (uint256 i = 0; i < participants.length; i++) {
            address participant = participants[i];
            uint256 participantShare = (purchases[participant] * lockedSupply) / totalPurchased;

            _transfer(creator, participant, participantShare); // Transfer locked tokens
        }

        lockedSupply = 0; // Clear locked supply after distribution
    }
}
