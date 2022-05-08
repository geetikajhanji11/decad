// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  // PRODUCT
  const ProductContract = await hre.ethers.getContractFactory("ProductContract");
  const productContract = await ProductContract.deploy()
  await productContract.deployed()
  console.log("ProductContract deployed to: ", productContract.address)

  // DAD
  const DADContract = await hre.ethers.getContractFactory("DAD");
  const tokenContract = await DADContract.deploy()
  await tokenContract.deployed()
  console.log("DAD deployed to: ", tokenContract.address)

  // INFLUENCER
  const InfluencerContract = await hre.ethers.getContractFactory("InfluencerContract");
  const influencerContract = await InfluencerContract.deploy(productContract.address)
  await influencerContract.deployed()
  console.log("InfluencerContract deployed to: ", influencerContract.address)

  // COMPANY
  const CompanyContract = await hre.ethers.getContractFactory("CompanyContract");
  const companyContract = await CompanyContract.deploy(tokenContract.address, 1, productContract.address, influencerContract.address)
  await companyContract.deployed()
  console.log("CompanyContract deployed to: ", companyContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
