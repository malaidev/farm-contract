
var HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()
const package = require('./package')
const MNEMONIC = process.env.MNEMONIC
const token =  process.env.INFURA_TOKEN
const etherscanKey = process.env.ETHERSCAN_KEY

// const MNEMONIC = "";


module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/" + token)
      },
      network_id: 3,
      gas: 7000000
      
            //make sure this gas allocation isn't over 4M, which is the max
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/" + token);
      },
      network_id: 4,
      gas: 6000000,
    },
    kovan: {
      provider: function() { 
       return new HDWalletProvider(MNEMONIC, "https://kovan.infura.io/v3/" + token);
      },
      network_id: 42,
      gas: 6000000,
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://mainnet.infura.io/v3/" + token)
      },
      network_id: 1,
      gas: 6000000
      
            //make sure this gas allocation isn't over 4M, which is the max
    }
  },  

  compilers: {
    solc: {
      version: "0.6.12",
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: etherscanKey
  },
  verify: {
    preamble: "Author: Bird.Money"
  }
};
