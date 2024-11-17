require('@nomiclabs/hardhat-ethers');


module.exports = {
  solidity: "0.8.19", // Adjust this if you're using a different Solidity version
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/410b3c85627e4eb5b423a4150a06e9bc`,  // Use your Infura API URL
      accounts: [`d4d60c0b2850bc3fa15aa7cd529c5669bf8432df15a8037322f8a13dfcb09372`], // Use your wallet's private key (set in .env file)
    },
  },
};
