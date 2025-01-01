// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MemeToken/CultureToken.sol";

contract MemeCultureWar {
    struct MemeWarDetails {
        address creator;
        address challenger;
        address creatorToken; // Null for non-token wars
        address challengerToken; // Null for non-token wars
        string meme1URI; // Link to the post (twitter post of meme1)
        string meme2URI; // Link to the post (twitter post of meme2)
        uint256 saleTarget; // Null for non-token wars
        uint256 pointTarget; // Null for token wars (number of retweets target or likes)
        bool isResolved;
        bool isTokenWar; // Determines if it's a token-based war
        address winner;
        string description;
    }

    uint256 public memeWarIdCounter;
    mapping(uint256 => MemeWarDetails) public memeWars;
    mapping(uint256 => mapping(address => uint256)) public userPoints;
    mapping(address => uint256[]) public userJoinedWars;
    mapping(address => uint256[]) public userWonWars;
    mapping(address => uint256[]) public usersLostWars;
    uint256[] public activeWars;
    uint256[] public closedWars;

    event MemeWarCreated(uint256 indexed warId, address creator, bool isTokenWar);
    event MemeWarAccepted(uint256 indexed warId, address challenger);
    event MemeWarResolved(uint256 indexed warId, address winner);
    event MemeWarPointUpdated(uint256 indexed warId, address user, uint256 newPoints);
    event MemeWarPointTargetUpdated(uint256 indexed warId, uint256 newPointTarget);



    // Create a Meme War without tokens
    function createMemeWar(string memory _meme1URI, uint256 _pointTarget, string memory _description) external {
        require(bytes(_meme1URI).length > 0, "meme uri must be greater than 0");
        require(_pointTarget > 0, "Target must be greater than 0");
        memeWarIdCounter++;
        memeWars[memeWarIdCounter] = MemeWarDetails({
            creator: msg.sender,
            challenger: address(0),
            creatorToken: address(0),
            challengerToken: address(0),
            meme1URI : _meme1URI,
            meme2URI : "",
            saleTarget: 0,
            pointTarget : _pointTarget,
            isResolved: false,
            isTokenWar: false,
            winner: address(0),
            description : _description
        });

        activeWars.push(memeWarIdCounter);

        emit MemeWarCreated(memeWarIdCounter, msg.sender, false);
    }

    // Create a MemeToken-based Meme War
    function createMemeTokenWar(
        string memory name,
        string memory symbol,
        uint256 saleTarget,
        string memory _meme1URI,
        string memory _description

    ) external {
        require(saleTarget > 0, "Sale target must be greater than zero");
        require(bytes(_meme1URI).length > 0, "meme uri must be greater than 0");
        require(saleTarget > 0, "Target must be greater than 0");

        // Deploy creator's token
        address creatorToken = address(new MemeToken(name, symbol, msg.sender, saleTarget));

        memeWarIdCounter++;
        memeWars[memeWarIdCounter] = MemeWarDetails({
            creator: msg.sender,
            challenger: address(0),
            creatorToken: creatorToken,
            challengerToken: address(0),
            meme1URI : _meme1URI,
            meme2URI : "",
            saleTarget: saleTarget,
            pointTarget : 0,
            isResolved: false,
            isTokenWar: true,
            winner: address(0),
            description : _description
        });

        activeWars.push(memeWarIdCounter);

        emit MemeWarCreated(memeWarIdCounter, msg.sender, true);
    }

    // Accept any Meme War
    function acceptMemeWar(uint256 warId, string memory name, string memory symbol, string memory _meme2URI) external {
        MemeWarDetails storage war = memeWars[warId];
        require(!war.isResolved, "War already resolved");
        require(war.challenger == address(0), "War already accepted");

        if (war.isTokenWar) {
            // Challenger deploys their token for token wars
            address challengerToken = address(new MemeToken(name, symbol, msg.sender, war.saleTarget));
            war.challengerToken = challengerToken;
        }

        war.challenger = msg.sender;
        war.meme2URI = _meme2URI;

        userJoinedWars[msg.sender].push(warId);


        emit MemeWarAccepted(warId, msg.sender);
    }

    // Resolve a Meme War
    function resolveMemeWar(uint256 warId, address winner) external {
        MemeWarDetails storage war = memeWars[warId];
        require(!war.isResolved, "War already resolved");
        require(winner == war.creator || winner == war.challenger, "Invalid winner");

        if (!(war.isTokenWar)) {
            // require();
            require(
                checkPointTargetReached(warId, winner),
                "Point target not yet reached by the winner"
            );
        }

        war.isResolved = true;
        war.winner = winner;
        userWonWars[winner].push(warId);

        // If it's a token-based war, airdrop locked tokens from the loser to participants
        if (war.isTokenWar) {
            address loserToken = winner == war.creator ? war.challengerToken : war.creatorToken;
            MemeToken(loserToken).airdropLockedTokens();
        }

        // Move war ID from active to closed
        for (uint256 i = 0; i < activeWars.length; i++) {
            if (activeWars[i] == warId) {
                activeWars[i] = activeWars[activeWars.length - 1];
                activeWars.pop();
                break;
            }
        }
        closedWars.push(warId);

        emit MemeWarResolved(warId, winner);
    }

    

      // Function to check if the point target is reached
    function checkPointTargetReached(uint256 warId, address user) public view returns (bool) {
        MemeWarDetails memory war = memeWars[warId];
        require(!war.isTokenWar, "This is not a point-based war");
        require(user == war.creator || user == war.challenger, "User not part of this war");

        return userPoints[warId][user] >= war.pointTarget;
    }

    // Function to update point target for a war
    function updatePointTarget(uint256 warId, uint256 newPointTarget) external {
        MemeWarDetails storage war = memeWars[warId];
        require(msg.sender == war.creator, "Only the creator can update the point target");
        require(!war.isResolved, "Cannot update a resolved war");
        require(!war.isTokenWar, "Cannot update point target for token-based wars");
        require(newPointTarget > war.pointTarget, "New point target must be greater than the current target");

        war.pointTarget = newPointTarget;

        emit MemeWarPointTargetUpdated(warId, newPointTarget);
    }

    // Get all wars joined by a user
    function getUserJoinedWars(address user) external view returns (uint256[] memory) {
        return userJoinedWars[user];
    }

    // Get all wars won by a user
    function getUserWonWars(address user) external view returns (uint256[] memory) {
        return userWonWars[user];
    }



    function updatePoints(uint256 warId, address user, uint256 newPoints) external {
        MemeWarDetails storage war = memeWars[warId];
        require(!war.isTokenWar, "Cannot update points for token-based wars");
        require(!war.isResolved, "Cannot update points for resolved wars");
        require(user == war.creator || user == war.challenger, "User not part of this war");

        userPoints[warId][user] = newPoints;

        emit MemeWarPointUpdated(warId, user, newPoints);
    }

    // Get all active Meme Wars
    function getActiveMemeWars() external view returns (uint256[] memory) {
        return activeWars;
    }

    // Get all closed Meme Wars
    function getClosedMemeWars() external view returns (uint256[] memory) {
        return closedWars;
    }

    // Get all MemeToken Wars
    function getAllMemeTokenWars() external view returns (uint256[] memory) {
        uint256[] memory tokenWars = new uint256[](memeWarIdCounter);
        uint256 count = 0;

        for (uint256 i = 1; i <= memeWarIdCounter; i++) {
            if (memeWars[i].isTokenWar) {
                tokenWars[count] = i;
                count++;
            }
        }

        // Resize the array to remove empty elements
        uint256[] memory resizedTokenWars = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            resizedTokenWars[i] = tokenWars[i];
        }
        return resizedTokenWars;
    }

    // Get all Meme Wars
    function getAllMemeWars() external view returns (MemeWarDetails[] memory) {
        MemeWarDetails[] memory allWars = new MemeWarDetails[](memeWarIdCounter);

        for (uint256 i = 1; i <= memeWarIdCounter; i++) {
            allWars[i - 1] = memeWars[i];
        }
        return allWars;
    }
}
