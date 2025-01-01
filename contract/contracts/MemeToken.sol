// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeTokenWar {
    // Struct to hold MemeToken details
    struct MemeToken {
        address creator;
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 price;
    }

    // Struct for MemeToken wars
    struct MemeTokenBattle {
        uint256 battleId;
        address participant1;
        address participant2;
        uint256 tokenId1;
        uint256 tokenId2;
        uint256 milestone; // Target milestone (e.g., price or market cap)
        bool isActive;
        bool isConcluded;
        address winner;
    }

    // State variables
    uint256 public tokenIdCounter;
    uint256 public battleIdCounter;
    mapping(uint256 => MemeToken) public tokens; // Token ID => MemeToken details
    mapping(uint256 => MemeTokenBattle) public battles; // Battle ID => MemeTokenBattle details
    mapping(address => uint256[]) public userTokens; // User => Their created token IDs

    uint256 public constant BASE_PRICE = 1 ether; // Initial price per token
    uint256 public constant PRICE_STEP = 0.01 ether; // Increment per token minted

    mapping(address => uint256[]) public userTokenBalance; // List of user tokens and value

    // Events
    event TokenCreated(
        uint256 indexed tokenId,
        address indexed creator,
        string name,
        string symbol,
        uint256 totalSupply
    );
    event BattleCreated(
        uint256 indexed battleId,
        address indexed participant1,
        address indexed participant2,
        uint256 tokenId1,
        uint256 tokenId2,
        uint256 milestone
    );
    event BattleConcluded(
        uint256 indexed battleId,
        address winner,
        uint256 losingTokenId
    );

    // Function to dynamically create a MemeToken
    function createMemeToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(totalSupply > 0, "Total supply must be greater than zero");

        tokenIdCounter++;
        uint256 newTokenId = tokenIdCounter;

        // Store the new token details
        tokens[newTokenId] = MemeToken({
            creator: msg.sender,
            name: name,
            symbol: symbol,
            totalSupply: totalSupply,
            price: BASE_PRICE
        });

        userTokens[msg.sender].push(newTokenId);

        emit TokenCreated(newTokenId, msg.sender, name, symbol, totalSupply);
        return newTokenId;
    }

    // Function to create a MemeToken battle
    function createBattle(
        uint256 tokenId1,
        uint256 tokenId2,
        uint256 milestone
    ) external {
        require(tokens[tokenId1].creator == msg.sender, "Not the creator of token1");
        require(tokenId1 != tokenId2, "Cannot battle the same token");
        require(tokens[tokenId1].totalSupply > 0, "Invalid token1");
        require(tokens[tokenId2].totalSupply > 0, "Invalid token2");

        battleIdCounter++;
        uint256 newBattleId = battleIdCounter;

        battles[newBattleId] = MemeTokenBattle({
            battleId: newBattleId,
            participant1: msg.sender,
            participant2: address(0),
            tokenId1: tokenId1,
            tokenId2: tokenId2,
            milestone: milestone,
            isActive: true,
            isConcluded: false,
            winner: address(0)
        });

        emit BattleCreated(
            newBattleId,
            msg.sender,
            address(0),
            tokenId1,
            tokenId2,
            milestone
        );
    }

    // Function for a second participant to join the battle
    function joinBattle(uint256 battleId, uint256 tokenId2) external {
        MemeTokenBattle storage battle = battles[battleId];
        require(battle.isActive, "Battle is not active");
        require(battle.participant2 == address(0), "Battle already has two participants");
        require(tokens[tokenId2].creator == msg.sender, "Not the creator of token2");
        require(tokenId2 != battle.tokenId1, "Cannot join with the same token");

        battle.participant2 = msg.sender;
        battle.tokenId2 = tokenId2;

        // Update battle details
        battles[battleId] = battle;
    }

    // Function to conclude a battle
    function concludeBattle(uint256 battleId) external {
        MemeTokenBattle storage battle = battles[battleId];
        require(battle.isActive, "Battle is not active");
        require(battle.participant1 != address(0) && battle.participant2 != address(0), "Battle not fully set up");

        MemeToken storage token1 = tokens[battle.tokenId1];
        MemeToken storage token2 = tokens[battle.tokenId2];

        // Determine the winner based on the milestone (e.g., price, supply, etc.)
        bool token1Wins = token1.price >= battle.milestone;
        bool token2Wins = token2.price >= battle.milestone;
        require(token1Wins || token2Wins, "Milestone not reached");

        // Declare the winner and conclude the battle
        if (token1Wins) {
            battle.winner = battle.participant1;
        } else {
            battle.winner = battle.participant2;
        }

        battle.isConcluded = true;
        battle.isActive = false;

        // Transfer the losing token's details to the winner
        uint256 losingTokenId = token1Wins ? battle.tokenId2 : battle.tokenId1;
        delete tokens[losingTokenId];

        emit BattleConcluded(battleId, battle.winner, losingTokenId);
    }
}
