# Test cases

The following test cases are implemented in [AaveDIVAWrapper.test.ts](./AaveDIVAWrapper.test.ts) file.

## AaveDIVAWrapper

### Constructor

#### Functionality

- Should initialize parameters at contract deployment.
- Should have zero accrued yield immediately after contract deployment before any collateral tokens are registered.

#### Reverts

- Should revert with `ZeroAddress` error if DIVA address is zero.
- Should revert with `ZeroAddress` error if Aave V3 address is zero.
- Should revert with `OwnableInvalidOwner` error if owner address is zero.

### getAToken

#### Functionality

- Should return the same aTokenAddress as in Aave Protocol for a supported collateral token.
- Should return zero aToken address for an unsupported collateral token.

### registerCollateralToken

#### Functionality

- Should register a new collateral token.
- Should correctly initialize wToken with symbol, name, decimals and owner address.
- Should initialize wToken with zero total supply.
- Should set unlimited allowance for wToken transfers to DIVA Protocol.
- Should set unlimited allowance for collateral token transfers to Aave V3 Pool contract.
- Should have zero accrued yield immediately after registering a collateral token.
- Should have zero accrued yield after several blocks post-registration when no pools are created.

#### Reverts

- Should revert with `CollateralTokenAlreadyRegistered` error if collateral token is already registered.
- Should revert with `UnsupportedCollateralToken` error if collateral token is not supported by Aave V3.
- Should revert with `UnsupportedCollateralToken` error if collateral token is the zero address.
- Should set unlimited allowance for collateral token transfers to Aave V3 Pool contract.

### wToken

#### Functionality

- Should return the AaveDIVAWrapper contract address as the owner of the wToken.
- Should not decrease wToken allowance when maximum is given.

#### Reverts

- Should revert with 'WToken: caller is not owner' error if AaveDIVAWrapper owner tries to mint wToken directly.
- Should revert with 'WToken: caller is not owner' error if any other non-owner account tries to mint wToken directly.
- Should revert with 'WToken: caller is not owner' error if AaveDIVAWrapper owner tries to burn wToken directly.
- Should revert with 'WToken: caller is not owner' error if any other non-owner account tries to burn wToken directly.

### createContingentPool

#### Functionality

- Should create a contingent pool with wToken as collateral and initialize all pool parameters correctly.
- Should correctly allocate long and short tokens to the specified recipient.
- Should correctly allocate long and short tokens to different recipients.
- Should not allocate any long or short tokens to AaveDIVAWrapper contract.
- Should reduce the user's collateral token balance by the deposited amount.
- Should increase the wToken total supply by the deposited amount.
- Should increase DIVA Protocol's wToken balance by the deposited amount after creating a pool.
- The AaveDIVAWrapper contract's wToken balance should be zero before and after pool creation.
- The AaveDIVAWrapper contract's collateralToken balance should be zero before and after pool creation.
- Should increase the AaveDIVAWrapper contract's aToken balance by the deposited amount after creating a pool.
- Should accrue yield after creating a pool.
- Should return a non-zero poolId when creating a pool.

#### Reverts

- Should revert with `CollateralTokenNotRegistered` error if the collateral token is not registered.

#### Events

- Should emit a `PoolIssued` event in AaveDIVAWrapper when creating a pool.

### addLiquidity

#### Functionality

- Should correctly allocate long and short tokens to the specified recipient.
- Should correctly allocate long and short tokens to different recipients.
- Should reduce the user's collateral token balance by the deposited amount.
- Should increase the wToken total supply by the deposited amount.
- Should increase DIVA Protocol's wToken balance by the deposited amount after adding liquidity.
- The AaveDIVAWrapper contract's wToken balance should be zero before and after adding liquidity.
- The AaveDIVAWrapper contract's collateralToken balance should be zero before and after adding liquidity.
- Should increase the AaveDIVAWrapper contract's aToken balance by the deposited amount after adding liquidity.

#### Reverts

- Should revert with `CollateralTokenNotRegistered` error if the collateral token is not registered.

### removeLiquidity

#### Functionality

- Should reduce the user's long and short token balances by the position token amount removed.
- Should increase the user's collateral token balance by the position token amount removed adjusted for DIVA fee.
- Should reduce the wToken total supply by the position token amount removed adjusted for DIVA fee.
- Should reduce DIVA Protocol's wToken balance by the position token amount removed adjusted for DIVA fee.
- The AaveDIVAWrapper contract's wToken balance should be zero before and after removing liquidity.
- The AaveDIVAWrapper contract's collateralToken balance should be zero before and after removing liquidity.
- Should remove long token balance amount when using `type(uint256).max` and long < short balance.
- Should remove short token balance amount when using `type(uint256).max` and short < long balance.
- Should reduce the AaveDIVAWrapper contract's aToken balance by the position token amount removed adjusted for DIVA fee.
- Should return the `_amountReturned` variable.

#### Reverts

- Should revert with `CollateralTokenNotRegistered` error if an invalid poolId is provided.
- Should revert with `ERC20: transfer to the zero address` error if recipient is the zero address.

### redeemWToken

#### Functionality

- Should allow DIVA treasury to claim protocol fees in wToken and redeem them for collateral tokens.
- Should return the `_amountReturned` variable.
- Should redeem the user's entire wToken balance if `type(uint256).max` is submitted.

#### Reverts

- Should revert with `ERC20InsufficientBalance` error when attempting to redeem more wTokens than user's balance.
- Should revert with `ERC20: transfer to the zero address` error if recipient is the zero address.

#### Events

- Should emit `WTokenRedeemed` event when redeeming wTokens.

### claimYield

#### Functionality

- Should allow the owner to claim the accrued yield.
- Should reduce the AaveDIVAWrapper contract's aToken balance by the claimed yield amount.
- Should not affect the owner's aToken balance when claiming yield.
- Should allow owner to claim and send accrued yield to a non-owner recipient address.
- Should allow owner to claim accrued yield multiple times and receive correct total amount.
- Should return the `_amountReturned` variable.

#### Reverts

- Should revert with `CollateralTokenNotRegistered` error when attempting to claim yield for an unregistered collateral token.
- Should revert with Aave error code 26 when attempting to claim yield when no yield has accrued.
- Should revert if called by non-owner account.
- Should revert with `ERC20: transfer to the zero address` error if recipient is the zero address.

#### Events

- Should emit an `YieldClaimed` event when owner claims the yield.

### approveCollateralTokenForAave

#### Functionality

- Should reset the allowance of a registered collateral token for Aave V3 to maximum value after it has been partially depleted.
- Should allow any account to reset the Aave allowance for a registered collateral token.

### redeemPositionToken

#### Functionality

- Should reduce the long token balance of the redeeming user.
- Should reduce the short token balance of the redeeming user.
- Should increase the user's collateral token balance.
- Should reduce the wToken supply after redeeming long tokens.
- Should reduce the wToken supply after redeeming short tokens.
- The AaveDIVAWrapper contract's wToken balance should be zero before and after redeeming long tokens.
- The AaveDIVAWrapper contract's wToken balance should be zero before and after redeeming short tokens.
- The AaveDIVAWrapper contract's collateralToken balance should be zero before and after redeeming long tokens.
- The AaveDIVAWrapper contract's collateralToken balance should be zero before and after redeeming short tokens.
- Should reduce the AaveDIVAWrapper contract's aToken balance after redeeming long tokens.
- Should reduce the AaveDIVAWrapper contract's aToken balance after redeeming short tokens.
- Should return the `_amountReturned` variable.
- Should redeem the user's entire long token balance if `type(uint256).max` is submitted.
- Should redeem the user's entire short token balance if `type(uint256).max` is submitted.

#### Reverts

- Should revert with `CollateralTokenNotRegistered` error if redeeming with an invalid position token.
- Should revert with `ERC20: transfer to the zero address` error if recipient is the zero address.

### batchRegisterCollateralToken

#### Functionality

- Should register two new collateral tokens.

#### Reverts

- Should revert if not called by owner.

### batchCreateContingentPool

#### Functionality

- Should correctly allocate long and short tokens to the specified recipients.

### batchRemoveLiquidity

#### Functionality

- Should correctly remove liquidity and transfer collateral tokens to recipients

### batchRedeemPositionToken

#### Functionality

- Should correctly redeem position tokens and transfer collateral tokens to recipients

### batchRedeemWToken

#### Functionality

- Should correctly redeem wTokens and transfer collateral tokens to recipients

### batchClaimYield

#### Functionality

- Should correctly claim yield and transfer collateral tokens to recipients

#### Reverts

- Should revert if not called by owner.

### batchApproveCollateralTokenForAave

#### Functionality

- Should approve collateral tokens for Aave

### Ownership Transfer

#### Functionality

- Should follow the two-step transfer process correctly.

#### Reverts

- Should revert if non-owner tries to transfer ownership.
- Should revert if non-pending owner tries to accept ownership.
