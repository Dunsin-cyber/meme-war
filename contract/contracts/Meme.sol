// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Meme {
    
    struct War {
        address creator; // meme challenger
        address opponent; // meme opponent
        uint256 stake; // Amount of tokens staked
        uint256 milestone; 
        string creatorMeme; 
        string opponentMeme; 
        bool active; 
        address winner; 
    }

    mapping(uint256 => War) public wars; // Map war ID to War struct
    uint256 public warCounter;
    mapping(address => uint256) public balances; // Token balances

    event WarCreated(uint256 indexed warId, address indexed creator, uint256 stake, uint256 milestone);
    event WarJoined(uint256 indexed warId, address indexed opponent, uint256 stake);
    event WarWon(uint256 indexed warId, address indexed winner);


    function createWar(uint256 milestone, string memory creatorMeme) external payable {
        require(msg.value > 0, "Stake must be greater than zero");
        warCounter++;

        wars[warCounter] = War({
            creator: msg.sender,
            opponent: address(0),
            stake: msg.value,
            milestone: milestone,
            creatorMeme: creatorMeme,
            opponentMeme: "",
            active: true,
            winner: address(0)
        });

        emit WarCreated(warCounter, msg.sender, msg.value, milestone);
    }


    function joinWar(uint256 warId, string memory opponentMeme) external payable {
        War storage war = wars[warId];
        require(war.active, "War is not active");
        require(war.opponent == address(0), "War already joined");
        require(msg.value == war.stake, "Stake must match the creator's stake");

        war.opponent = msg.sender;
        war.opponentMeme = opponentMeme;

        emit WarJoined(warId, msg.sender, msg.value);
    }


    function declareWinner(uint256 warId, address winner) external {
        War storage war = wars[warId];
        require(war.active, "War is not active");
        require(winner == war.creator || winner == war.opponent, "Invalid winner");

        war.active = false;
        war.winner = winner;

        // Transfer the reward to the winner
        payable(winner).transfer(war.stake * 2);

        emit WarWon(warId, winner);
    }

    // TODO
}
