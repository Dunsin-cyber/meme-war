const hre = require("hardhat");

async function main() {
  const MemeWar = await hre.ethers.getContractFactory("MemeCultureWar");
  console.log("Deploying MemeWar...");

  const memeWar = await MemeWar.deploy();

//   await memeWar.deployed();

  console.log("MemeWar deployed to:", memeWar.address);
  console.log("MemeWar deployed to:", memeWar.target);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
