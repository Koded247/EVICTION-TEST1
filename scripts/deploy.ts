import { ethers } from "hardhat";

async function main() {

  const ColorBotleGame = await ethers.getContractFactory("ColorBotleGame");
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);


  const colorBotleGame = await ColorBotleGame.deploy();

  await colorBotleGame.deployed();

  console.log("ColorBotleGame deployed to:", colorBotleGame.address);


  console.log("Waiting for block confirmations...");
  await colorBotleGame.deployTransaction.wait(6);

  console.log("Contract verified. Address:", colorBotleGame.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});