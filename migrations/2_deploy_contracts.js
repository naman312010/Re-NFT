const renft = artifacts.require("renft");

module.exports = async function (deployer) {
    await deployer.deploy(renft);
    console.log(`renft address:${renft.address}`);
}