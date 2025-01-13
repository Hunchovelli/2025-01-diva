# AaveDIVAWrapper

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit)

A connector between [DIVA Protocol](https://github.com/divaprotocol/diva-protocol-v1) and [Aave V3](https://github.com/aave-dao/aave-v3-origin.git) that enables yield generation on DIVA Protocol pool collateral.

## Documentation

- [Main Documentation](./DOCUMENTATION.md)
- [Test Cases](./test/Tests.md)

## Installation

It is recommended to install [`pnpm`](https://pnpm.io) through the `npm` package manager, which comes bundled with [Node.js](https://nodejs.org/en) when you install it on your system. It is recommended to use a Node.js version `>= 20.0.0`.

Once you have `npm` installed, you can run the following both to install and upgrade `pnpm`:

```console
npm install -g pnpm
```

After having installed `pnpm`, simply run:

```console
pnpm install
```

## Deployment

To deploy your own instance of AaveDIVAWrapper, you'll need:

1. The address of [DIVA Protocol](https://github.com/divaprotocol/diva-protocol-v1/blob/main/DOCUMENTATION.md#contract-addresses) on your target network.
2. The address of [Aave V3 Pool contract](https://aave.com/docs/resources/addresses) on your target network.
3. The address that should receive the yield (owner).

### Configuration

1. Set up your environment variables:
```console
npx hardhat vars set PRIVATE_KEY
```

You can learn more about hardhat variables [here](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables).

You can also run `npx hardhat vars setup` to see which other configuration variables are available.

2. Configure your API keys for contract verification in the `hardhat.config.ts` file.

### Deploy

Deploy to your chosen network using one of the following commands:

```console
pnpm deploy:ethmain         # Ethereum Mainnet
pnpm deploy:arbitrummain    # Arbitrum
pnpm deploy:polygon         # Polygon
pnpm deploy:gnosis          # Gnosis Chain
pnpm deploy:sepolia         # Ethereum Sepolia (Testnet)
```

Note: Both DIVA Protocol and Aave V3 are currently available on the following networks:

**Mainnets:**
- Ethereum Mainnet
- Polygon
- Arbitrum One
- Gnosis Chain

**Testnets:**
- Ethereum Sepolia

If you wish to deploy to a network that is not listed above, reach out to the [DIVA Protocol Discord](https://discord.gg/v4KYKms6zh) to request support.

### Contract Verification

The contract will be verified automatically on the network it is deployed to (see [deploy/deployAaveDIVAWrapper.ts](./deploy/deployAaveDIVAWrapper.ts) script).

### Register collateral token

After contract deployment, the owner must register collateral tokens (e.g., USDT or USDC) that will be used with the wrapper. Only [tokens supported by Aave V3](https://www.config.fyi/) can be registered. This is a required first step before the wrapper can be used.

You can find example code for registering tokens in the `registerCollateralToken` function within the [deploy/deployAaveDIVAWrapper.ts](./deploy/deployAaveDIVAWrapper.ts) script.

### Using a Ledger Hardware Wallet

This template implements the [`hardhat-ledger`](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ledger) plugin. Run `npx hardhat set LEDGER_ACCOUNT` and enter the address of the Ledger account you want to use.

## Testing

To run the tests:

```console
pnpm test:hh
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
