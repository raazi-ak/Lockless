describe("ValetAccess", function () {
  let owner, valet1, valetAccess;

  beforeEach(async function () {
    [owner, valet1] = await ethers.getSigners();
    const ValetAccess = await ethers.getContractFactory("ValetAccess");
    valetAccess = await ValetAccess.deploy();
  });

  it("should set the deployer as the owner", async function () {
    expect(await valetAccess.owner()).to.equal(owner.address);
  });

  it("should grant access to the valet", async function () {
    const duration = 60; // 1 minute
    await valetAccess.grantAccess(valet1.address, duration);

    const hasAccess = await valetAccess.checkAccess(valet1.address);
    expect(hasAccess).to.equal(true);
  });

  it("should revoke access after expiry", async function () {
    const duration = 2; // 2 seconds for quicker test
    await valetAccess.grantAccess(valet1.address, duration);

    // Increase time by 3 seconds (to exceed the 2 seconds of granted access)
    await ethers.provider.send("evm_increaseTime", [3]);
    await ethers.provider.send("evm_mine", []); // Ensure the blockchain mines the new block

    const hasAccess = await valetAccess.checkAccess(valet1.address);
    expect(hasAccess).to.equal(false); // Access should be revoked after expiry
  });

  it("should allow the owner to revoke valet access", async function () {
    const duration = 60; // 1 minute
    await valetAccess.grantAccess(valet1.address, duration);

    await valetAccess.revokeAccess(valet1.address);

    const hasAccess = await valetAccess.checkAccess(valet1.address);
    expect(hasAccess).to.equal(false);
  });

  it("should not allow a non-owner to grant access", async function () {
    const duration = 60; // 1 minute
    await expect(
      valetAccess.connect(valet1).grantAccess(valet1.address, duration)
    ).to.be.revertedWith("Only owner can call this");
  });
});
