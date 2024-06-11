import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VotingContract from '../contracts/Voting.json';
import './Voting.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Voting = () => {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState('');
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access if needed
        } catch (error) {
          console.error("User denied account access");
        }
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];

        if (deployedNetwork) {
          const contract = new web3Instance.eth.Contract(
            VotingContract.abi,
            deployedNetwork.address
          );
          setWeb3(web3Instance);
          setContract(contract);
          setAccounts(accounts);
          const proposals = await contract.methods.getProposals().call();
          setProposals(proposals);
        } else {
          console.error('Contract not deployed on the current network');
        }
      } else {
        console.error('Ethereum provider not found');
      }
    };

    initializeWeb3();
  }, []);

  const createProposal = async () => {
    if (contract && accounts.length > 0 && newProposal) {
      try {
        await contract.methods.createProposal(newProposal).send({
          from: accounts[0],
          gas: 300000, // Set the gas limit
          gasPrice: web3.utils.toWei('20', 'gwei') // Use legacy gas pricing
        });
        const proposals = await contract.methods.getProposals().call();
        setProposals(proposals);
        setNewProposal('');
      } catch (error) {
        console.error("Error creating proposal: ", error);
      }
    }
  };

  const vote = async (index) => {
    if (contract && accounts.length > 0) {
      try {
        await contract.methods.vote(index).send({
          from: accounts[0],
          gas: 300000, // Set the gas limit
          gasPrice: web3.utils.toWei('20', 'gwei') // Use legacy gas pricing
        });
        const proposals = await contract.methods.getProposals().call();
        setProposals(proposals);
      } catch (error) {
        console.error("Error voting: ", error);
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Decentralized Voting DApp</h1>
      <p className="lead text-center">Welcome to the Decentralized Voting DApp! This platform allows you to create proposals and vote on them using the Ethereum blockchain.</p>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">How to Participate:</h5>
          <ol className="list-group list-group-numbered">
            <li className="list-group-item">Connect your MetaMask wallet to the Ganache network.</li>
            <li className="list-group-item">To create a new proposal, enter the proposal name below and click "Create Proposal".</li>
            <li className="list-group-item">To vote on a proposal, click the "Vote" button next to the proposal.</li>
          </ol>
          <p className="card-text mt-3">Your vote will be recorded on the blockchain, ensuring transparency and security.</p>
        </div>
      </div>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          value={newProposal}
          onChange={(e) => setNewProposal(e.target.value)}
          placeholder="Enter proposal name"
        />
        <button className="btn btn-primary" onClick={createProposal}>Create Proposal</button>
      </div>

      <h2 className="text-center mb-4">Proposals</h2>
      <ul className="list-group">
        {proposals.map((proposal, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{proposal.name} - {proposal.voteCount} votes</span>
            <button className="btn btn-success" onClick={() => vote(index)}>Vote</button>
          </li>
        ))}
      </ul>

      <h2 className="text-center mt-4">Contract Logic & Limitations</h2>
      <div className="card">
        <div className="card-body">
          <p>This voting system has the following rules and limitations:</p>
          <ul className="list-group">
            <li className="list-group-item">Each user can only vote once per proposal. This ensures fair voting.</li>
            <li className="list-group-item">Each proposal is created with an initial vote count of zero.</li>
            <li className="list-group-item">Users cannot vote on invalid or non-existent proposals.</li>
            <li className="list-group-item">Once a vote is cast, it cannot be changed or retracted.</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-4">Thank you for participating in decentralized voting! Your vote matters.</p>
    </div>
  );
};

export default Voting;
