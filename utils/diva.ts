import { ethers } from "hardhat";
const { parseUnits } = ethers;
import { IDIVA } from "../typechain-types";

// Fee in collateral token decimals
export const calcFee = (
  fee: bigint, // integer expressed with 18 decimals
  collateralBalance: bigint, // integer expressed with collateral token decimals
  collateralTokenDecimals: number,
): bigint => {
  const SCALING = parseUnits("1", 18 - collateralTokenDecimals);
  const UNIT = parseUnits("1");

  fee = (fee * collateralBalance * SCALING) / UNIT / SCALING;

  return fee;
};

export async function calcTotalDIVAFee(
  diva: IDIVA,
  poolParams: IDIVA.PoolStructOutput,
  amount: bigint,
  collateralTokenDecimals: number,
): Promise<bigint> {
  // Get fee parameters from DIVA Protocol
  const feesParams: IDIVA.FeesStructOutput = await diva.getFees(
    poolParams.indexFees,
  );

  // Calculate protocol and settlement fees
  const protocolFee = calcFee(
    feesParams.protocolFee,
    amount,
    collateralTokenDecimals,
  );
  const settlementFee = calcFee(
    feesParams.settlementFee,
    amount,
    collateralTokenDecimals,
  );

  // Return total fee
  return protocolFee + settlementFee;
}
