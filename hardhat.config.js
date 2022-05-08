require("@nomiclabs/hardhat-waffle")
require("dotenv").config()

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: []
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}