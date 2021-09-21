// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/*
    Smart Contract acts as an ether bank with basic functionality
    including depositing, withdrawing, and accessing balance of
    owner's bank account. Smart Contract utilizes payable functions
    that can only be accessed with a modifier which verifies
    that user is the rightful owner of bank account.
*/

contract basicBank {

    address public owner;
    uint private balance;

    event depoSuccess(uint);
    event withdrSuccess(uint);

    constructor() {
        owner = msg.sender;
        balance = 0;
    }

    function deposit() external payable isOwner {
        balance += msg.value;
        emit depoSuccess(msg.value);
    }

    function withdraw(uint _value, address payable _destAddy) external payable isOwner {
        require(_value <= balance, "Insufficient funds.");
        balance -= _value;
        _destAddy.transfer(_value);
        emit withdrSuccess(_value);
    }

    function getBalance() external view isOwner returns(uint) {
        return balance;
    }

    modifier isOwner() {
        require(msg.sender == owner, "You must be the owner.");
        _;
    }
}