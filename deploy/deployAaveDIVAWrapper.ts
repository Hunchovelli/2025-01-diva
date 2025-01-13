/**
 * Deploy AaveDIVAWrapper Contract
 *
 * CONSTRUCTOR ARGUMENTS:
 * - aaveV3Pool: Address of Aave V3 Pool contract
 * - diva: Address of DIVA Protocol contract
 * - owner: Address that will own the AaveDIVAWrapper contract and receive the yield
 *
 * DEPLOYMENT COMMAND (using Sepolia as an example):
 * `npx hardhat run deploy/deployAaveDIVAWrapper.ts --network sepolia`
 *
 * REQUIRED SETUP:
 * Before first deployment, set these environment variables using hardhat-vars:
 *
 * 1. Network Independent Setup:
 *    - PRIVATE_KEY:       `npx hardhat vars set PRIVATE_KEY`
 *    - ETHERSCAN_API_KEY: `npx hardhat vars set ETHERSCAN_API_KEY` (POLYGON_API_KEY, ARBITRUM_API_KEY, etc.)
 *
 * 2. Network Specific Setup:
 *    - ETH_SEPOLIA_TESTNET_URL: `npx hardhat vars set ETH_SEPOLIA_TESTNET_URL` (POLYGON_MAINNET_URL, ARBITRUM_MAINNET_URL, etc.)
 *
 * Note: Variable names must match those in hardhat.config.ts
 */

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DIVA_ADDRESS, AAVE_ADDRESS } from "../utils/addresses";

// Colour codes for terminal prints
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";

/*//////////////////////////////////////////////////////////////
                            USER INPUTS
//////////////////////////////////////////////////////////////*/

// Owner address that will receive the yield
const OWNER = "0x9AdEFeb576dcF52F5220709c1B267d89d5208D78";

// AaveV3Pool and DIVA addresses are derived from the network specified in the deployment command.

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function main(hre: HardhatRuntimeEnvironment) {
  // Get network from command line
  const NETWORK = hre.network.name;

  // Contract addresses
  const AAVE_V3_POOL = AAVE_ADDRESS[NETWORK];
  const DIVA = DIVA_ADDRESS[NETWORK];

  console.log("Starting deployment of AaveDIVAWrapper...\n");
  console.log("Network:", NETWORK);
  console.log("Aave V3 Pool:", AAVE_V3_POOL);
  console.log("DIVA Protocol:", DIVA);
  console.log("Owner:", OWNER, "\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy AaveDIVAWrapper
  const AaveDIVAWrapper =
    await hre.ethers.getContractFactory("AaveDIVAWrapper");
  const aaveDIVAWrapper = await AaveDIVAWrapper.deploy(
    AAVE_V3_POOL,
    DIVA,
    OWNER,
  );
  await aaveDIVAWrapper.waitForDeployment();

  const contractAddress = await aaveDIVAWrapper.getAddress();
  console.log(
    "AaveDIVAWrapper deployed to: " + `${GREEN}${contractAddress}${RESET}\n`,
  );

  console.log(
    "Waiting 30 seconds before beginning the contract verification to allow the block explorer to index the contract...\n",
  );
  await delay(30000); // Wait for 30 seconds before verifying the contract

  // Verify the contract
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [AAVE_V3_POOL, DIVA, OWNER],
  });

  console.log("\nDeployment and verification completed successfully!");
}

// Execute the deployment
main(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
