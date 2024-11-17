// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ValetAccess {
    address public owner;

    struct Access {
        uint256 expiryTime;
        bool hasAccess;
    }

    mapping(address => Access) public accessList;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    // Grant access to a valet for a certain duration (in seconds)
    function grantAccess(address valet, uint256 duration) external onlyOwner {
        require(duration > 0, "Duration should be greater than 0");
        accessList[valet].expiryTime = block.timestamp + duration;
        accessList[valet].hasAccess = true;
    }

    // Check if the valet has access
    function checkAccess(address valet) external view returns (bool) {
        if (block.timestamp > accessList[valet].expiryTime) {
            return false; // Expired access
        }
        return accessList[valet].hasAccess;
    }

    // Revoke access immediately
    function revokeAccess(address valet) external onlyOwner {
        accessList[valet].hasAccess = false;
    }
}
