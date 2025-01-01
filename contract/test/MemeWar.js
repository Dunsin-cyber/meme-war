const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemeWar Contract", function () {
    let MemeWar, memeWar, owner, addr1, addr2;

    beforeEach(async function () {
        // Deploy contract
        MemeWar = await ethers.getContractFactory("MemeWar");
        [owner, addr1, addr2] = await ethers.getSigners();
        memeWar = await MemeWar.deploy();
        await memeWar.deployed();
    });

    it("Should deploy the contract correctly", async function () {
        expect(await memeWar.owner()).to.equal(owner.address);
    });

    it("Should allow users to create memes", async function () {
        const tx = await memeWar.connect(addr1).createMeme("https://example.com/meme1", 10, { value: ethers.utils.parseEther("0.01") });
        await tx.wait();

        const meme = await memeWar.memes(1);
        expect(meme.creator).to.equal(addr1.address);
        expect(meme.isActive).to.be.true;
    });

    it("Should allow users to create and join battles", async function () {
        // Create meme
        await memeWar.connect(addr1).createMeme("https://example.com/meme1", 10, { value: ethers.utils.parseEther("0.01") });

        // Create battle
        const tx = await memeWar.connect(addr1).createBattle(
            1,
            ethers.utils.parseEther("1"),
            3600,
            ethers.constants.AddressZero, // ETH battle
            "ETH",
            true,
            5
        );
        await tx.wait();

        const battle = await memeWar.battles(1);
        expect(battle.creator).to.equal(addr1.address);
        expect(battle.isActive).to.be.true;

        // Join battle
        await memeWar.connect(addr2).joinTokenBattle(1, ethers.utils.parseEther("1"), { value: ethers.utils.parseEther("1") });

        const joinedBattle = await memeWar.battles(1);
        expect(joinedBattle.totalWager).to.equal(ethers.utils.parseEther("2"));
    });

    it("Should allow users to vote for memes", async function () {
        await memeWar.connect(addr1).createMeme("https://example.com/meme1", 10, { value: ethers.utils.parseEther("0.01") });
        await memeWar.connect(addr2).voteMeme(1);

        const memeVotes = await memeWar.getMemeVotes(1);
        expect(memeVotes).to.equal(1);
    });

    it("Should conclude battles and transfer rewards", async function () {
        await memeWar.connect(addr1).createMeme("https://example.com/meme1", 10, { value: ethers.utils.parseEther("0.01") });
        await memeWar.connect(addr2).createMeme("https://example.com/meme2", 10, { value: ethers.utils.parseEther("0.01") });

        await memeWar.connect(addr1).createBattle(1, ethers.utils.parseEther("1"), 3600, ethers.constants.AddressZero, "ETH", true, 2);
        await memeWar.connect(addr2).joinTokenBattle(1, ethers.utils.parseEther("1"), { value: ethers.utils.parseEther("1") });

        await memeWar.connect(addr1).voteMeme(1);
        await memeWar.connect(addr1).voteMeme(2);

        await memeWar.concludeBattle(1, 1);

        const balance = await ethers.provider.getBalance(addr1.address);
        console.log("Creator balance after win:", ethers.utils.formatEther(balance));
    });
});
