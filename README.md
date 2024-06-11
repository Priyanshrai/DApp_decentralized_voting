![Decentralized Voting DApp Screenshot](https://github.com/Priyanshrai/DApp_decentralized_voting/assets/105690577/3016b9c3-026f-47e7-a15e-86dce33f2500)

```markdown
# Decentralized Voting DApp

A decentralized voting application built on the Ethereum blockchain using Solidity, React, Web3.js, and Bootstrap. This DApp allows users to create proposals and vote on them in a transparent and secure manner.

![Decentralized Voting DApp Screenshot](https://github.com/Priyanshrai/DApp_decentralized_voting/assets/105690577/3016b9c3-026f-47e7-a15e-86dce33f2500)

## Features

- Create new proposals.
- Vote on existing proposals.
- Transparent and secure voting process using blockchain technology.
- Modern, responsive UI using Bootstrap.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Truffle (v5.x or later)
- Ganache (v6.x or later)
- MetaMask browser extension

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/decentralized-voting-dapp.git
   cd decentralized-voting-dapp
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Navigate to the `client` directory and install its dependencies:**
   ```bash
   cd client
   npm install
   ```

## Setting Up the Development Environment

1. **Start Ganache:**
   ```bash
   ganache-cli
   ```

2. **Compile and deploy the smart contract:**
   ```bash
   cd ..
   truffle compile
   truffle migrate
   ```

3. **Configure MetaMask:**
   - Open MetaMask and create a new custom network.
   - Set the network name to "Ganache" (or any desired name).
   - Set the RPC URL to `http://127.0.0.1:8545`.
   - Set the Chain ID to `1337` (or the ID displayed in Ganache).
   - Import one of the Ganache accounts into MetaMask using its private key.

4. **Update the `Voting.json` file in the `client/src/contracts` directory:**
   - Copy the contract ABI from the `build/contracts/Voting.json` file.
   - Paste the ABI into the `client/src/contracts/Voting.json` file.
   - Update the contract address in the `client/src/contracts/Voting.json` file with the deployed contract address from Ganache.

## Running the Application

1. **Start the React development server:**
   ```bash
   cd client
   npm start
   ```

2. **Open your browser and navigate to `http://localhost:3000` to access the Decentralized Voting DApp.**

## Usage

- **Create Proposals**: Enter a proposal name in the input field and click "Create Proposal".
- **Vote on Proposals**: Click the "Vote" button next to a proposal to cast your vote.

## Smart Contract

The `Voting.sol` smart contract is located in the `contracts` directory. It defines the following functions:

- `createProposal(string memory _name)`: Creates a new proposal with the given name.
- `vote(uint _proposalIndex)`: Casts a vote on the specified proposal.
- `getProposals()`: Retrieves the list of all proposals.

### Contract Logic & Limitations

This voting system has the following rules and limitations:

- Each user can only vote once per proposal. This ensures fair voting.
- Each proposal is created with an initial vote count of zero.
- Users cannot vote on invalid or non-existent proposals.
- Once a vote is cast, it cannot be changed or retracted.

## Project Structure

- `contracts/`: Contains the Solidity smart contract.
- `migrations/`: Contains migration scripts for deploying the smart contract.
- `client/src/components/`: Contains the React components.
- `client/src/contracts/`: Contains the ABI and contract address for interacting with the smart contract.
- `client/src/Voting.css`: Contains the CSS for styling the Voting component.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


Feel free to customize the README file based on your specific project details, such as the repository URL, screenshot, and any additional sections or information you want to include.
```

### Summary of README Content:
1. **Introduction**: Brief description of the DApp.
2. **Features**: List of key features.
3. **Prerequisites**: Required tools and versions.
4. **Installation**: Steps to clone the repository and install dependencies.
5. **Setting Up the Development Environment**: Instructions to start Ganache, deploy the contract, and configure MetaMask.
6. **Running the Application**: Steps to start the React development server and access the DApp.
7. **Usage**: Instructions on how to use the DApp.
8. **Smart Contract**: Details of the smart contract and its functions.
9. **Contract Logic & Limitations**: Explanation of the rules and limitations of the smart contract.
10. **Project Structure**: Overview of the project directory structure.
11. **Contributing**: Information on how to contribute to the project.
12. **License**: License information.


