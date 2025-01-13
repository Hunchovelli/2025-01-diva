import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import {
  AaveDIVAWrapper,
  IAave,
  IDIVA,
  MockERC20,
  ERC20,
  WToken,
} from "../typechain-types";

export interface CreateContingentPoolParams {
  referenceAsset: string;
  expiryTime: string;
  floor: string;
  inflection: string;
  cap: string;
  gradient: string;
  collateralAmount: string;
  collateralToken: string;
  dataProvider: string;
  capacity: string;
  longRecipient: string;
  shortRecipient: string;
  permissionedERC721Token: string;
}

export interface AddLiquidityParams {
  poolId: string;
  collateralAmount: string;
  longRecipient: string;
  shortRecipient: string;
}

export interface RemoveLiquidityParams {
  poolId: string;
  positionTokenAmount: string;
  recipient: string;
}

export interface SetupOutput {
  dummyTokenContract: MockERC20;
  dummyTokenDecimals: number;
  owner: SignerWithAddress;
  acc2: SignerWithAddress;
  acc3: SignerWithAddress;
  dataProvider: SignerWithAddress;
  impersonatedSigner: SignerWithAddress;
  collateralTokenContract: ERC20;
  collateralTokenDecimals: number;
  aaveDIVAWrapper: AaveDIVAWrapper;
  aave: IAave;
  diva: IDIVA;
  createContingentPoolParams: CreateContingentPoolParams;
}

export interface SetupWithPoolResult {
  s: SetupOutput;
  wTokenContract: WToken;
  wTokenAddress: string;
  aTokenContract: ERC20;
  aTokenAddress: string;
  poolId: string;
  poolParams: IDIVA.PoolStructOutput;
  shortTokenContract: ERC20;
  longTokenContract: ERC20;
  r: RemoveLiquidityParams;
  divaFees: bigint;
  a: AddLiquidityParams;
}

export interface SetupWithConfirmedPoolResult {
  s: SetupOutput;
  poolId: string;
  poolParams: IDIVA.PoolStructOutput;
  longTokenContract: ERC20;
  shortTokenContract: ERC20;
  longTokenBalance: bigint;
  shortTokenBalance: bigint;
  collateralTokenBalance: bigint;
  wTokenSupply: bigint;
  wTokenContract: WToken;
  aTokenContract: ERC20;
  divaFees: bigint;
  expectedLongTokenPayout: bigint;
  expectedShortTokenPayout: bigint;
}
