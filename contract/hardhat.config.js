require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
// require('@nomiclabs/hardhat-ethers');
const { mnemonic } = require('./secrets.json');
const { privateKey } = require('./secrets.json');
const { bscscanApiKey } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
// };


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  etherscan: {
    apiKey: bscscanApiKey,
  },
  defaultNetwork: "testnet",
  networks: {
  	localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    testnet: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      chainId: 97,
      gasPrice: 10000000000, // 10 Gwei
      gas: 3000000, 
      accounts: [privateKey]
      // accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
  solidity: {
  version: "0.8.27",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    viaIR: true,
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};