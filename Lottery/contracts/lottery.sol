pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require (msg.value >= 0.001 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns(uint) {
        // keccak256 is same as sha256
        return uint(keccak256(block.difficulty,now,players));
    }
    
    function pickWinner() public restricted returns (uint) {
        uint index = random() % players.length;
        // will transfer some amount of money from contract and send it to the calling address
        players[index].transfer(this.balance);
        uint balance = players[index].balance;
        players = new address[](0);
        return balance;
    }
    
    function returnEntries() public restricted {
        
    }
    
    function getPlayers() public restricted view returns (address[]){
        return players;
    } 
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}