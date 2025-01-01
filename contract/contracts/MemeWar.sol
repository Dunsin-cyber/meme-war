// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.27;

// import "./Memes/MemeToken.sol";

// contract MemeWar {
//     struct Meme {
//         address creator; 
//         uint256 memeId;
//         string uri;
//         string name;     
//         uint256 currentVotes; 
//         uint256 milestone;    // Target vote count for winning
//         bool isActive;   
//     }

//     struct MemeBattle {
//         uint256 meme1Id;       
//         uint256 meme2Id;       
//         address participant1;  
//         address participant2;  
//         uint256 wager;         
//         bool isActive;         
//         bool isConcluded; 
//         bool milestoneBased;
//         uint256 startTime;
//         uint256 endTime;
//         address token1;
//         address token2;
//         string token1Name;
//         string token2Name;
//         string token1Ticker;
//         string token2Ticker;
//         address winner;   
//         uint256 milestoneTarget;   
//         uint256 priceFactor;
//         uint256 initialSupply; 
//     }

//     // State variables
//     mapping(uint256 => Meme) public memes;
//     uint256 public memeCount;

//     mapping(uint256 => MemeBattle) public battles;
//     uint256 public battleCount;
//     mapping(uint256 => address[]) public participants;

//     mapping(address => uint256) public lockPeriod;
//     mapping(address => uint256) public lockedAmount;

//     bool public warActive;

//     address public winner;
//     uint256 public startTime;
//     uint256 public endTime;

//     mapping(uint256 => mapping(address => bool)) public hasVoted;
//     mapping(address => mapping(address => uint256)) public tokenLockedAmount; 
//     mapping(address => mapping(address => uint256)) public tokenLockPeriod;

//     uint256 public participationFee = 0.01 ether;

//     // Events
//     event MemeCreated(uint256 memeId, address indexed creator, string name, uint256 milestone);
//     event BattleCreated(uint256 battleId, uint256 meme1Id, uint256 wager);
//     event ParticipantJoined(uint256 battleId, uint256 meme2Id, address indexed participant);
//     event Vote(uint256 memeId, address indexed voter);
//     event BattleConcluded(uint256 battleId, address winner);

//     constructor() {}

//     // Create a new meme
//     function createMeme(string memory name, string memory uri, uint256 milestone) external payable {
//         require(msg.value == participationFee, "Participation fee required");
//         require(bytes(name).length > 0, "Meme name is required");
//         require(milestone > 0, "Milestone must be greater than 0");

//         // This 

//         memeCount++;
//         memes[memeCount] = Meme({
//             creator: msg.sender,
//             name: name,
//             memeId: memeCount,
//             uri: uri,
//             milestone: milestone,
//             currentVotes: 0,
//             isActive: true
//         });

//         emit MemeCreated(memeCount, msg.sender, name, milestone);
//     }

//     function createMemeTokenWar(uint256 _memeId, uint256 _duration, string memory _token1Name, string memory _tokenTicker, uint256 _priceFactor, uint256 _initSupply) external payable {
//         require(memes[memeId].creator == msg.sender, "You must be the woner of this meme to start a battle");
//         require(memes[memeId].isActive, "Meme is not active");
//         require(_duration > 0, "War duration must be greater than 0");

//         // Deploy a new token contract
//         address _token1Address = address(new MemeToken(_token1Name, _token1Ticker, _priceFactor, _initSupply));



//     }


//     function createBattle(uint256 memeId, uint256 wager, uint256 _duration,
//         string memory _token1Name,
//         bool milestoneBased,
//         uint256 _milestoneTarget,
//         string memory _token1Ticker,
//         uint256 _priceFactor,
//         uint256 _initSupply
//         ) external payable {
//         require(memes[memeId].creator == msg.sender, "You must be the woner of this meme to start a battle");
//         require(memes[memeId].isActive, "Meme is not active");
//         require(msg.value == wager, "Wager amount mismatch");
//         // require(_token1 != address(0), "Invalid token addresses");
//         require(_duration > 0, "War duration must be greater than 0");

//         // uint256 startTime = block.timestamp;
//         // uint256 endTime = startTime + _duration;

//         // Deploy a new token contract
//         address _token1Address = address(new MemeToken(_token1Name, _token1Ticker, _priceFactor, _initSupply));

//         battleCount++;
//         battles[battleCount] = MemeBattle({
//             meme1Id: memeId,
//             meme2Id: 0, // tempo
//             participant1: msg.sender,
//             participant2: address(0),
//             wager: wager,
//             isActive: true,
//             isConcluded: false,
//             milestoneBased : milestoneBased,
//             startTime : block.timestamp,
//             endTime : block.timestamp + _duration,
//             token1 : _token1Address,
//             token2: address(0),
//             token1Name : _token1Name,
//             token2Name : "",
//             token1Ticker: _token1Ticker,
//             token2Ticker: "", 
//             winner: address(0),
//             milestoneTarget:  _milestoneTarget,
//             priceFactor: _priceFactor,
//             initialSupply: _initSupply
//         });

//         emit BattleCreated(battleCount, memeId, wager);
//     }

//     // function lock(uint256 _amount, address _tokenAddress) public returns(bool){
//     //     require(MemeToken(_tokenAddress).balanceOf(msg.sender) >= _amount,"You dont have enough balance to lock!");
//     //     require(userToContract(msg.sender, _amount),"Failed to transfer from user to contract");
//     //     lockPeriod[msg.sender] = block.timestamp + 1 days;
//     //     lockedAmount[msg.sender] = _amount;
//     //     emit locked(_amount);
//     //     return true;
//     // }

//     function joinTokenBattle(uint256 battleId, string memory _token2Ticker, string memory _token2Name, uint256 memeId) external payable {
//         MemeBattle storage battle = battles[battleId];
//         require(battle.isActive, "Battle is not active");
//         require(battle.participant2 == address(0), "Battle already has two participants");
//         require(memes[memeId].creator == msg.sender, "You must own this meme to join the battle");
//         require(memeId != battle.meme1Id, "You cannot join a battle with the same meme");
//         require(memes[memeId].isActive, "Meme is not active");
//         require(msg.value == battle.wager, "Wager amount mismatch");
//         require(block.timestamp < battle.endTime, "War has already ended");
//         // require(_token2 != battle.token1, "Invalid token for this battle");

        
//         address _token2Address = address(new MemeToken(_token2Name, _token2Ticker, battle.priceFactor, battle.initialSupply));

//         MemeToken(battle.token1).transferFrom(msg.sender, address(this), battle.wager); 
//         MemeToken(_token2Address).transferFrom(msg.sender, address(this), battle.wager);



//         battle.meme2Id = memeId;
//         battle.participant2 = msg.sender;
//         battle.token2Name = _token2Name;
//         battle.token2 = _token2Address;
//         participants[battleId].push(msg.sender);

//         emit ParticipantJoined(battleId, memeId, msg.sender);
//     }

//     // Vote for a meme in a battle
//     function voteMeme(uint256 battleId, uint256 memeId) external {
//         MemeBattle storage battle = battles[battleId];
//         require(battle.isActive, "Battle is not active");
//         require(!battle.isConcluded, "Battle is already concluded");
//         require(memeId == battle.meme1Id || memeId == battle.meme2Id, "Invalid meme ID for this battle");
//         require(!hasVoted[memeId][msg.sender], "You have already voted for this meme");

//         hasVoted[memeId][msg.sender] = true;
//         memes[memeId].currentVotes++;

//         emit Vote(memeId, msg.sender);

//         // Check if any meme has reached the milestone
//         if (memes[memeId].currentVotes >= memes[memeId].milestone) {
//             concludeBattle(battleId, memeId);
//         }
//     }

//     // Conclude a battle
//     function concludeBattle(uint256 battleId, uint256 winningMemeId) internal {
//         MemeBattle storage battle = battles[battleId];
//         require(!battle.isConcluded, "Battle already concluded");
//         require(block.timestamp >= battle.endTime, "War period has not ended");

//         uint256 token1MarketCap = MemeToken(battle.token1).totalSupply(); // Example metric
//         uint256 token2MarketCap = MemeToken(battle.token2).totalSupply();

//         if (battle.milestoneBased) {
//             if (token1MarketCap >= battle.milestoneTarget && token2MarketCap < battle.milestoneTarget) {
//                 battle.winner = battle.token1;
//             } else if (token2MarketCap >= battle.milestoneTarget && token1MarketCap < battle.milestoneTarget) {
//                 battle.winner = battle.token2;
//             }
//         } else {
//             // Default to market cap comparison
//             battle.winner = token1MarketCap > token2MarketCap ? battle.token1 : battle.token2;
//         }

//         uint256 losingMemeId = (winningMemeId == battle.meme1Id) ? battle.meme2Id : battle.meme1Id;

//         battle.isConcluded = true;
//         battle.winner = memes[winningMemeId].creator;
//         battle.isActive = false;

//         // Transfer the wager to the winner
//         uint256 prize = battle.wager * 2;
//         payable(memes[winningMemeId].creator).transfer(prize);

//         // Mark memes as inactive
//         memes[winningMemeId].isActive = false;
//         memes[losingMemeId].isActive = false;

//         emit BattleConcluded(battleId, memes[winningMemeId].creator);
//     }

//     // Fallback function
//     receive() external payable {}
// }