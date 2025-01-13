// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {
    mapping(address => mapping(address => uint256)) private allowed;

    // Added for testing
    error InvalidPayloadSize();

    constructor() ERC20("Mock USDT", "USDT") {}

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    // Modifier to mimic USDT's payload size check
    modifier onlyPayloadSize(uint256 size) {
        if (msg.data.length != size + 4) {
            revert InvalidPayloadSize();
        }
        _;
    }

    // Exact implementation from USDT
    function approve(address _spender, uint256 _value) public override onlyPayloadSize(2 * 32) returns (bool) {
        // To change the approve amount you first have to reduce the addresses`
        //  allowance to zero by calling `approve(_spender, 0)` if it is not
        //  already 0 to mitigate the race condition described here:
        //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        require(!((_value != 0) && (allowed[msg.sender][_spender] != 0)), "USDT: current allowance must be 0");

        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Exact implementation from USDT
    function allowance(address _owner, address _spender) public view override returns (uint256) {
        return allowed[_owner][_spender];
    }
}
