// Disabling ESLint rule for using Record over index signature
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface AddressMap {
  [key: string]: string;
}

// DIVA Protocol addresses
// Source: https://github.com/divaprotocol/diva-protocol-v1/blob/main/DOCUMENTATION.md#contract-addresses
// Mumbai and chiado not included as former was discontinued and latter is not supported by Aave V3.
export const DIVA_ADDRESS: AddressMap = {
  ethMain: "0x2C9c47E7d254e493f02acfB410864b9a86c28e1D",
  polygon: "0x2C9c47E7d254e493f02acfB410864b9a86c28e1D",
  gnosis: "0x2C9c47E7d254e493f02acfB410864b9a86c28e1D",
  arbitrumMain: "0x2C9c47E7d254e493f02acfB410864b9a86c28e1D", // Arbitrum One
  sepolia: "0x2C9c47E7d254e493f02acfB410864b9a86c28e1D",
  arbitrumTestnet: "0x2C9c47E7d254e493f02acfB410864b9a86c28e1D",
};

// Addresses of the Aave V3 Pool contract, the main contract users interact with.
// Source: https://docs.aave.com/developers/deployed-contracts/v3-mainnet
export const AAVE_ADDRESS: AddressMap = {
  ethMain: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  polygon: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  gnosis: "0xb50201558B00496A145fE76f7424749556E326D8",
  arbitrumMain: "0x794a61358D6845594F94dc1DB02A252b5b4814aD", // Arbitrum One
  sepolia: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
  arbitrumTestnet: "0xB25a5D144626a0D488e52AE717A051a2E9997076",
};

interface NetworkConfig {
  collateralTokens: Record<
    string,
    {
      address: string;
      holder: string;
      description: string;
    }
  >;
  unsupportedToken: {
    address: string;
    description: string;
  };
}

type NetworkConfigs = Record<string, NetworkConfig>;

export const NETWORK_CONFIGS: NetworkConfigs = {
  polygon: {
    collateralTokens: {
      USDC: {
        address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        holder: "0x4D8336bDa6C11BD2a805C291Ec719BaeDD10AcB9", // Account to be impersonated during the tests
        description: "USDC on Polygon",
      },
      USDT: {
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        holder: "0x1AB4973a48dc892Cd9971ECE8e01DcC7688f8F23", // Account to be impersonated during the tests
        description: "USDT on Polygon",
      },
    },
    unsupportedToken: {
      address: "0xB7b31a6BC18e48888545CE79e83E06003bE70930",
      description: "APE token (not supported on Aave)",
    },
  },
  arbitrumMain: {
    collateralTokens: {
      USDC: {
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        holder: "0xE6fCC492FB5eA091bDBE2E1a9f163e5039F144BC", // Account to be impersonated during the tests
        description: "USDC on Arbitrum",
      },
      USDT: {
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        holder: "0x3931dAb967C3E2dbb492FE12460a66d0fe4cC857", // Account to be impersonated during the tests
        description: "USDT on Arbitrum",
      },
    },
    unsupportedToken: {
      address: "0x7f9FBf9bDd3F4105C478b996B648FE6e828a1e98",
      description: "APE token (not supported on Aave)",
    },
  },
};
