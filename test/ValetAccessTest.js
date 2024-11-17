const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("ValetAccess Contract", function () {
  let ValetAccess, valetAccess, owner, valet;

  beforeEach(async function () {
    ValetAccess = await ethers.getContractFactory("ValetAccess");
    [owner, valet] = await ethers.getSigners();
    valetAccess = await ValetAccess.deploy();
  });

  it("should emit AccessGranted event when access is granted", async function () {
    const duration = 3600; // 1 hour

    await expect(valetAccess.grantAccess(valet.address, duration))
      .to.emit(valetAccess, "AccessGranted")
      .withArgs(valet.address, await valetAccess.accessList(valet.address).then(a => a.expiryTime));
  });
});

it("should emit AccessRevoked event when access is revoked", async function () {
  const duration = 3600;

  // First, grant access
  await valetAccess.grantAccess(valet.address, duration);

  // Then revoke access
  await expect(valetAccess.revokeAccess(valet.address))
    .to.emit(valetAccess, "AccessRevoked")
    .withArgs(valet.address);
});

it("should correctly validate access based on expiry time", async function () {
  const duration = 3600; // 1 hour
  await valetAccess.grantAccess(valet.address, duration);

  // Check access immediately
  expect(await valetAccess.checkAccess(valet.address)).to.equal(true);

  // Advance time to beyond the expiry
  await ethers.provider.send("evm_increaseTime", [3601]); // 3601 seconds later
  await ethers.provider.send("evm_mine");

  // Check access after expiry
  expect(await valetAccess.checkAccess(valet.address)).to.equal(false);
});



// const { expect } = require("chai");
// const { ethers } = require("hardhat");


// describe("ValetAccess", function () {
//     let owner, valet1, valetAccess;
  
//     beforeEach(async function () {
//       [owner, valet1] = await ethers.getSigners();
//       const ValetAccess = await ethers.getContractFactory("ValetAccess");
//       valetAccess = await ValetAccess.deploy();
//     });
  
//     it("should set the deployer as the owner", async function () {
//       expect(await valetAccess.owner()).to.equal(owner.address);
//     });
  
//     it("should grant access to the valet", async function () {
//       const duration = 60; // 1 minute
//       await valetAccess.grantAccess(valet1.address, duration);
  
//       const hasAccess = await valetAccess.checkAccess(valet1.address);
//       expect(hasAccess).to.equal(true);
//     });
  
//     it("should revoke access after expiry", async function () {
//       const duration = 2; // 2 seconds for quicker test
//       await valetAccess.grantAccess(valet1.address, duration);
  
//       // Increase time by 3 seconds (to exceed the 2 seconds of granted access)
//       await ethers.provider.send("evm_increaseTime", [3]);
//       await ethers.provider.send("evm_mine", []); // Ensure the blockchain mines the new block
  
//       const hasAccess = await valetAccess.checkAccess(valet1.address);
//       expect(hasAccess).to.equal(false); // Access should be revoked after expiry
//     });
  
//     it("should allow the owner to revoke valet access", async function () {
//       const duration = 60; // 1 minute
//       await valetAccess.grantAccess(valet1.address, duration);
  
//       await valetAccess.revokeAccess(valet1.address);
  
//       const hasAccess = await valetAccess.checkAccess(valet1.address);
//       expect(hasAccess).to.equal(false);
//     });
  
//     it("should not allow a non-owner to grant access", async function () {
//       const duration = 60; // 1 minute
//       await expect(
//         valetAccess.connect(valet1).grantAccess(valet1.address, duration)
//       ).to.be.revertedWith("Only owner can call this");
//     });
//   });
  