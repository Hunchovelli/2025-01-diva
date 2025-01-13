import { AaveDIVAWrapper, IDIVA } from "../typechain-types";

// Function to extract poolId from PoolIssued event.
// Note that in ethers v6, events are no longer part of the transaction receipt.
// Instead, filters have to be used. For more info, read here:
// https://ethereum.stackexchange.com/questions/152626/ethers-6-transaction-receipt-events-information
export async function getPoolIdFromAaveDIVAWrapperEvent(
  aaveDIVAWrapper: AaveDIVAWrapper,
): Promise<string> {
  const filter = aaveDIVAWrapper.filters.PoolIssued();
  const events = await aaveDIVAWrapper.queryFilter(filter, -1);
  const event = events[0];
  if (!event) throw new Error("No PoolIssued event found");
  const poolId = event.args.poolId;
  return poolId;
}

export async function getPoolIdFromDIVAEvent(diva: IDIVA): Promise<string> {
  const filter = diva.filters.PoolIssued();
  const events = await diva.queryFilter(filter, -1);
  const event = events[0];
  if (!event) throw new Error("No PoolIssued event found");
  const poolId = event.args.poolId;
  return poolId;
}

// Add this new function to handle batch events
export async function getPoolIdsFromAaveDIVAWrapperEvent(
  aaveDIVAWrapper: AaveDIVAWrapper,
  tx: ContractTransactionResponse,
): Promise<string[]> {
  const receipt = await tx.wait();
  if (!receipt) throw new Error("No receipt found");

  // Filter for PoolIssued events
  const poolIssuedEvents = receipt.logs.filter((log) => {
    try {
      const parsedLog = aaveDIVAWrapper.interface.parseLog(log);
      return parsedLog?.name === "PoolIssued";
    } catch {
      return false;
    }
  });

  // Extract poolIds from each event
  return poolIssuedEvents.map((event) => {
    const parsedLog = aaveDIVAWrapper.interface.parseLog(event);
    return parsedLog?.args[0];
  });
}
