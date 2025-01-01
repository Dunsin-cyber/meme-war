// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Bonds/Bond.sol";
import "./Memes/MemeToken.sol";

contract MemeCulture {
    struct MemeWarDetails {
        address creator;
        address challenger;
        uint256 wager;
        uint256 endTime;
        bool isActive;
        bool isResolved;
    }

    struct MemeTokenWarDetails {
        address creator;
        address challenger;
        address creatorToken;
        address challengerToken;
        uint256 endTime;
        bool isResolved;
    }

    uint256 public memeWarIdCounter;
    uint256 public memeTokenWarIdCounter;

    mapping(uint256 => MemeWarDetails) public memeWars;
    mapping(uint256 => MemeTokenWarDetails) public memeTokenWars;

    event MemeWarCreated(uint256 indexed warId, address creator, uint256 wager, uint256 duration);
    event MemeWarAccepted(uint256 indexed warId, address challenger);
    event MemeWarResolved(uint256 indexed warId, address winner);

    event MemeTokenWarCreated(uint256 indexed warId, address creator, address token);
    event MemeTokenWarAccepted(uint256 indexed warId, address challenger, address token);
    event MemeTokenWarResolved(uint256 indexed warId, address winner);

    function createMemeWar(uint256 wager, uint256 duration) external payable {
        require(msg.value == wager, "Wager must match the amount sent");
        require(duration > 0, "Duration must be greater than zero");

        memeWarIdCounter++;
        memeWars[memeWarIdCounter] = MemeWarDetails({
            creator: msg.sender,
            challenger: address(0),
            wager: wager,
            endTime: block.timestamp + duration,
            isActive: true,
            isResolved: false
        });

        emit MemeWarCreated(memeWarIdCounter, msg.sender, wager, duration);
    }

    function acceptMemeWar(uint256 warId) external payable {
        MemeWarDetails storage war = memeWars[warId];
        require(war.isActive, "War is not active");
        require(war.challenger == address(0), "War already accepted");
        require(msg.value == war.wager, "Wager must match");

        war.challenger = msg.sender;

        emit MemeWarAccepted(warId, msg.sender);
    }

    function completeMemeWar(uint256 warId, address winner) external {
        MemeWarDetails storage war = memeWars[warId];
        require(war.isActive, "War is not active");
        require(!war.isResolved, "War already resolved");
        require(winner == war.creator || winner == war.challenger, "Invalid winner");

        war.isActive = false;
        war.isResolved = true;

        payable(winner).transfer(war.wager * 2);

        emit MemeWarResolved(warId, winner);
    }

    

    function createMemeTokenWar(string memory name, string memory symbol, uint256 duration, uint256 _priceFactor) external {
        require(duration > 0, "Duration must be greater than zero");

        address creatorToken = address(new MemeToken(name, symbol, _priceFactor, 1_000_000_000));

        memeTokenWarIdCounter++;
        memeTokenWars[memeTokenWarIdCounter] = MemeTokenWarDetails({
            creator: msg.sender,
            challenger: address(0),
            creatorToken: creatorToken,
            challengerToken: address(0),
            endTime: block.timestamp + duration,
            isResolved: false
        });

        emit MemeTokenWarCreated(memeTokenWarIdCounter, msg.sender, creatorToken);
    }

    function acceptMemeTokenWar(uint256 warId, string memory name, string memory symbol, uint256 _priceFactor) external {
        MemeTokenWarDetails storage war = memeTokenWars[warId];
        require(!war.isResolved, "War already resolved");
        require(war.challenger == address(0), "War already accepted");

        address challengerToken = address(new MemeToken(name, symbol, _priceFactor, 1_000_000_000));
        war.challenger = msg.sender;
        war.challengerToken = challengerToken;

        emit MemeTokenWarAccepted(warId, msg.sender, challengerToken);
    }

    function resolveMemeTokenWar(uint256 warId, address winner) external {
        MemeTokenWarDetails storage war = memeTokenWars[warId];
        require(!war.isResolved, "War already resolved");
        require(block.timestamp >= war.endTime, "War duration not over");
        require(winner == war.creator || winner == war.challenger, "Invalid winner");

        war.isResolved = true;

        emit MemeTokenWarResolved(warId, winner);
    }
}
