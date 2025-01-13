import { vars } from "hardhat/config";

interface NetworkForkConfig {
  url: string;
  blockNumber: number;
}

const FORK_CONFIGS: Record<string, NetworkForkConfig> = {
  polygon: {
    url: vars.get("POLYGON_MAINNET_URL", "https://polygon-rpc.com"), // Set via `npx hardhat vars set POLYGON_MAINNET_URL`
    blockNumber: 65941593, // Block number for Aave V3.2
  },
  arbitrumMain: {
    url: vars.get("ARBITRUM_MAINNET_URL", "https://arb1.arbitrum.io/rpc"), // Set via `npx hardhat vars set ARBITRUM_MAIN
    blockNumber: 289488417,
  },
};

export function getForkConfig(network: string): NetworkForkConfig {
  const config = FORK_CONFIGS[network];
  if (!config) {
    throw new Error(
      `Unsupported network: ${network}. Supported networks are: ${Object.keys(FORK_CONFIGS).join(", ")}`,
    );
  }
  return config;
}
