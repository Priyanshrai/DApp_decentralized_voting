// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Proposal[] public proposals;

    event ProposalCreated(string name);
    event VoteCast(string proposalName, uint voteCount);

    function createProposal(string memory _name) public {
        proposals.push(Proposal({
            name: _name,
            voteCount: 0
        }));
        emit ProposalCreated(_name);
    }

    function vote(uint _proposalIndex) public {
        require(!voters[msg.sender], "You have already voted");
        require(_proposalIndex < proposals.length, "Invalid proposal index");

        voters[msg.sender] = true;
        proposals[_proposalIndex].voteCount += 1;

        emit VoteCast(proposals[_proposalIndex].name, proposals[_proposalIndex].voteCount);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
